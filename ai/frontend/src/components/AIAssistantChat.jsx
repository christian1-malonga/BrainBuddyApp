import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

const GeminiAPI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const AIAssistantChat = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'ai', text: `Welcome, ${user?.name || 'User'}. How can I help you today?.` }
  ]);
  const [input, setInput] = useState('');
  const fileInputRef = useRef();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState(0);

  useEffect(() => {
    if (history.length === 0) {
      setHistory([[...messages]]);
    }
  }, [messages, history]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    const userInput = input;
    setInput('');
    const aiReply = await fetchGeminiReply(userInput);
    const finalMessages = [...newMessages, { from: 'ai', text: aiReply }];
    setMessages(finalMessages);
    updateHistory(finalMessages);
  };

  const fetchGeminiReply = async (prompt, file = null) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GeminiAPI_KEY}`;
    
    let parts = [{ text: prompt }];

    if (file) {
      const base64File = await toBase64(file);
      parts.push({
        inline_data: {
          mime_type: file.type,
          data: base64File
        }
      });
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: parts }]
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Gemini API error:', error);
        return "Sorry, I'm having trouble connecting to the AI service (API response not OK).";
      }

      const data = await response.json();
      console.log('Gemini API response:', data);

      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        const botReply = data.candidates[0].content.parts[0].text;
        return botReply;
      } else {
        console.error('Unexpected Gemini API response format:', data);
        if (data.promptFeedback) {
          return `Sorry, I couldn't process that. Reason: ${data.promptFeedback.blockReason}`;
        }
        return "Sorry, I couldn't understand that.";
      }
    } catch (error) {
      console.error('Error fetching Gemini reply:', error);
      return "Sorry, something went wrong while fetching the response (catch block).";
    }
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessages = [...messages, { from: 'user', text: `Uploaded: ${file.name}` }];
      setMessages(newMessages);
      const aiReply = await fetchGeminiReply(`Analyze this file: ${file.name}`, file);
      const finalMessages = [...newMessages, { from: 'ai', text: aiReply }];
      setMessages(finalMessages);
      updateHistory(finalMessages);
    }
  };

  const handleMic = async () => {
    if (isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.start();
        setIsRecording(true);

                        mediaRecorder.current.ondataavailable = () => {
          // For now, we'll just simulate transcription
          setInput("Simulated transcribed text.");
        };
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert("Could not access microphone. Please check permissions.");
      }
    }
  };

  const newChat = () => {
    setMessages([{ from: 'ai', text: `Welcome, ${user?.name || 'User'}. Here’s your intelligent AI assistant.` }]);
    setHistory([...history, [{ from: 'ai', text: `Welcome, ${user?.name || 'User'}. Here’s your intelligent AI assistant.` }]]);
    setCurrentChat(history.length);
  };

  const switchChat = (index) => {
    setMessages(history[index]);
    setCurrentChat(index);
  };

  const updateHistory = (newMessages) => {
    const newHistory = [...history];
    newHistory[currentChat] = newMessages;
    setHistory(newHistory);
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl transition-all"
        onClick={() => setOpen(!open)}
        aria-label="Open AI Assistant"
      >
        <span role="img" aria-label="Chatbot">💬</span>
      </button>

      {open && (
        <div className={`fixed bottom-24 right-6 z-50 ${isMaximized ? 'w-full h-full' : 'w-80'} max-w-full bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-blue-400`}>
          <div className="bg-blue-600 text-white px-4 py-3 font-bold text-lg flex items-center">
            <span role="img" aria-label="Chatbot" className="mr-2">💬</span> AI Assistant
            <div className="ml-auto flex items-center">
              <button className="text-white text-xl mr-2" onClick={() => setIsMinimized(!isMinimized)}>−</button>
              <button className="text-white text-xl mr-2" onClick={() => setIsMaximized(!isMaximized)}>◻</button>
              <button className="text-white text-xl" onClick={() => setOpen(false)}>×</button>
            </div>
          </div>
          {!isMinimized && (
            <>
              <div className="flex flex-1">
                <div className="w-1/3 bg-gray-100 p-2 overflow-y-auto">
                  <button onClick={newChat} className="w-full bg-blue-500 text-white p-2 rounded mb-2">New Chat</button>
                  <h2 className="font-bold mb-2">History</h2>
                  <ul>
                    {history.map((_, index) => (
                      <li key={index} onClick={() => switchChat(index)} className={`p-2 cursor-pointer ${currentChat === index ? 'bg-blue-200' : ''}`}>
                        Chat {index + 1}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-2/3 flex flex-col">
                  <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50" style={{ maxHeight: isMaximized ? 'calc(100vh - 200px)' : 350 }}>
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.from === 'ai' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`rounded-xl px-4 py-2 ${msg.from === 'ai' ? 'bg-blue-100 text-blue-900' : 'bg-blue-600 text-white'}`}>{msg.text}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center p-2 border-t bg-white">
                    <button onClick={() => fileInputRef.current.click()} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="Upload">
                      <span role="img" aria-label="Upload">📎</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      onChange={handleUpload}
                    />
                    <input
                      className="flex-1 mx-2 px-3 py-2 border rounded-xl focus:outline-none"
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder={isRecording ? "Recording..." : "Type your message..."}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleMic} className={`p-2 text-blue-600 hover:bg-blue-100 rounded-full ${isRecording ? 'bg-red-500 text-white' : ''}`} title="Voice input">
                      <span role="img" aria-label="Mic">🎤</span>
                    </button>
                    <button onClick={handleSend} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="Send">
                      <span role="img" aria-label="Send">➡️</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-white border-t">
                <button onClick={newChat} className="w-full bg-blue-500 text-white p-2 rounded">New Chat</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AIAssistantChat;

