import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, X, Plus, MessageSquare, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

// Text Formatter Component
const TextFormatter = ({ text }) => {
  const formatText = (content) => {
    if (!content) return null;
    
    // Split by lines and process each line
    return content.split('\n').map((line, index) => {
      if (!line.trim()) return <br key={index} />;
      
      // Check for headings
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold my-2">{formatInline(line.substring(2))}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold my-2">{formatInline(line.substring(3))}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold my-2">{formatInline(line.substring(4))}</h3>;
      }
      
      // Check for lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={index} className="ml-4 list-disc">{formatInline(line.substring(2))}</li>;
      } else if (/^\d+\.\s/.test(line)) {
        return <li key={index} className="ml-4 list-decimal">{formatInline(line.replace(/^\d+\.\s/, ''))}</li>;
      }
      
      // Check for code blocks
      if (line.startsWith('```')) {
        return <div key={index} className="bg-gray-100 p-3 rounded my-2 font-mono text-sm overflow-x-auto">{
          line.substring(3).split('```').map((codePart, codeIndex) => (
            <div key={codeIndex}>{codePart}</div>
          ))
        }</div>;
      }
      
      // Regular paragraph
      return <p key={index} className="my-2">{formatInline(line)}</p>;
    });
  };
  
  const formatInline = (content) => {
    const elements = [];
    let remaining = content;
    
    // Process bold text: **bold**
    while (remaining.includes('**')) {
      const parts = remaining.split('**');
      
      // Add text before the bold
      if (parts[0]) elements.push(parts[0]);
      
      // Add bold text if it exists
      if (parts[1]) elements.push(<strong key={`bold-${elements.length}`} className="font-bold">{parts[1]}</strong>);
      
      // Update remaining text
      remaining = parts.slice(2).join('**');
    }
    
    // Process italic text: *italic*
    if (remaining.includes('*')) {
      const newElements = [];
      remaining.split('*').forEach((part, i) => {
        if (i % 2 === 1) {
          newElements.push(<em key={`italic-${newElements.length}`} className="italic">{part}</em>);
        } else {
          // Only add non-empty text parts
          if (part) newElements.push(part);
        }
      });
      // Only add if we have elements to avoid duplication
      if (newElements.length > 0) {
        elements.push(...newElements);
      }
    } else if (remaining) {
      // Only add remaining text if it's not empty
      elements.push(remaining);
    }
    
    return elements.length > 0 ? elements : content;
  };
  
  return <div className="formatted-text">{formatText(text)}</div>;
};

const AIAssistant = ({ isAuthenticated: propIsAuthenticated = false }) => {
    const { user, isAuthenticated: authIsAuthenticated } = useAuth();
    const isAuthenticated = propIsAuthenticated || authIsAuthenticated;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [bounceOffset, setBounceOffset] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [showLoginMessage, setShowLoginMessage] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // New state for sidebar and chat history
    const [showSidebar, setShowSidebar] = useState(true);
    const [chatHistory, setChatHistory] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [hasInitialized, setHasInitialized] = useState(false);

    // Refs for auto-scrolling, input area animation, and textarea focus
    const messagesEndRef = useRef(null);
    const inputAreaRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Initialize with a new chat only once when component mounts
    useEffect(() => {
        if (!hasInitialized && chatHistory.length === 0 && currentChatId === null) {
            createNewChat();
            setHasInitialized(true);
        }
    }, [chatHistory.length, currentChatId, hasInitialized]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Input area animation when messages appear
    useEffect(() => {
        if (inputAreaRef.current) {
            if (messages.length > 0) {
                inputAreaRef.current.classList.add('input-area-with-messages');
            } else {
                inputAreaRef.current.classList.remove('input-area-with-messages');
            }
        }
    }, [messages.length]);

    // Focus on textarea when dialog opens
    useEffect(() => {
        if (showDialog && textareaRef.current) {
            // Small timeout to ensure the dialog is fully rendered
            setTimeout(() => {
                textareaRef.current.focus();
            }, 100);
        }
    }, [showDialog]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Blinking animation
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
        }, 3000 + Math.random() * 2000);

        return () => clearInterval(blinkInterval);
    }, []);

    // Talking animation
    useEffect(() => {
        const talkInterval = setInterval(() => {
            setIsTalking(true);
            setTimeout(() => setIsTalking(false), 800 + Math.random() * 400);
        }, 4000 + Math.random() * 3000);

        return () => clearInterval(talkInterval);
    }, []);

    // Bouncing animation
    useEffect(() => {
        const bounceInterval = setInterval(() => {
            setBounceOffset(-8);
            setTimeout(() => setBounceOffset(0), 200);
        }, 2000 + Math.random() * 1000);

        return () => clearInterval(bounceInterval);
    }, []);

    const calculateEyePosition = () => {
        const centerX = window.innerWidth - 100;
        const centerY = window.innerHeight - 100;
        const deltaX = (mousePosition.x - centerX) * 0.015;
        const deltaY = (mousePosition.y - centerY) * 0.015;
    
        return {
            transform: `translate(${Math.max(-3, Math.min(3, deltaX))}px, ${Math.max(-3, Math.min(3, deltaY))}px)`,
            transition: 'transform 0.1s ease-out'
        };
    };

    const handleRobotClick = () => {
        if (!isAuthenticated) {
            setShowLoginMessage(true);
            setTimeout(() => setShowLoginMessage(false), 3000);
            return;
        }
        setShowDialog(true);
    };

    const createNewChat = () => {
        // Check if we already have an empty chat to avoid duplicates
        const emptyChat = chatHistory.find(chat => 
            chat.messages.length === 0 && chat.title === "New Chat"
        );
        
        if (emptyChat) {
            // Switch to the existing empty chat instead of creating a new one
            setCurrentChatId(emptyChat.id);
            setMessages([]);
            return emptyChat.id;
        }
        
        const newChatId = Date.now();
        const newChat = {
            id: newChatId,
            title: "New Chat",
            messages: [],
            createdAt: new Date()
        };
        
        setChatHistory(prev => [newChat, ...prev]);
        setCurrentChatId(newChatId);
        setMessages([]);
        
        return newChatId;
    };

    const switchChat = (chatId) => {
        const chat = chatHistory.find(chat => chat.id === chatId);
        if (chat) {
            setCurrentChatId(chatId);
            setMessages([...chat.messages]);
            
            // Focus on textarea after switching chats
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                }
            }, 100);
        }
    };

    const updateChatHistory = (updatedMessages) => {
        setChatHistory(prev => 
            prev.map(chat => 
                chat.id === currentChatId 
                    ? { ...chat, messages: updatedMessages, title: getChatTitle(updatedMessages) }
                    : chat
            )
        );
    };

    const getChatTitle = (messages) => {
        if (messages.length === 0) return "New Chat";
        const firstUserMessage = messages.find(msg => msg.role === 'user');
        return firstUserMessage 
            ? firstUserMessage.text.substring(0, 20) + (firstUserMessage.text.length > 20 ? "..." : "")
            : "Chat";
    };

    const formatDate = (date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    };

    const handleSendMessage = async () => {
        if (!prompt.trim()) return;
        
        const userMsg = { role: 'user', text: prompt };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        updateChatHistory(updatedMessages);
        
        setPrompt('');
        setIsLoading(true);
        
        try {
            // Vérifier si l'utilisateur demande qui a créé l'assistant
            const lowerPrompt = prompt.toLowerCase();
            const creatorQuestions = [
                'qui t\'as créé',
                'qui t\'a créé',
                'qui t as créé',
                'qui ta créé',
                'who created you',
                'who made you',
                'who built you',
                'who designed you',
                'who developed you',
                'who is your creator',
                'who is your developer',
                'who is your designer',
                'who is your father',
                'qui est ton créateur',
                'qui est ton développeur',
                'qui est ton concepteur',
                'qui est ton père'
            ];
            
            if (creatorQuestions.some(question => lowerPrompt.includes(question))) {
                // Réponse spéciale pour les questions sur le créateur
                const aiText = "Je suis fier de vous annoncer que j'ai été créé par Christian Malonga !";
                const finalMessages = [...updatedMessages, { role: 'ai', text: aiText }];
                setMessages(finalMessages);
                updateChatHistory(finalMessages);
            } else {
                // Gemini API call pour les autres questions
                const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: userMsg.text }] }]
                    })
                });
                
                const data = await res.json();
                const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not understand.';
                
                const finalMessages = [...updatedMessages, { role: 'ai', text: aiText }];
                setMessages(finalMessages);
                updateChatHistory(finalMessages);
            }
        } catch {
            const errorMessages = [...updatedMessages, { role: 'ai', text: 'Error connecting to AI.' }];
            setMessages(errorMessages);
            updateChatHistory(errorMessages);
        } finally {
            setIsLoading(false);
            
            // Refocus on textarea after sending message
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                }
            }, 100);
        }
    };

    const handleMicClick = () => {
        setIsListening(!isListening);
        // Handle voice recognition logic here
        if (!isListening) {
            console.log('Starting voice recognition...');
        } else {
            console.log('Stopping voice recognition...');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Upload handler (image/doc/camera)
    const handleUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const newMessages = [...messages, { role: 'user', text: `Uploaded: ${file.name}` }];
            setMessages(newMessages);
            updateChatHistory(newMessages);
            // Optionally, send file info to Gemini API or handle as needed
            
            // Refocus on textarea after upload
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                }
            }, 100);
        }
    };

    // Group chat history by date
    const groupChatsByDate = () => {
        const grouped = {};
        chatHistory.forEach(chat => {
            const dateKey = formatDate(new Date(chat.createdAt));
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(chat);
        });
        return grouped;
    };

    return (
        <>
            <style>
                {`
                    .input-area-centered {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        padding-top: 1rem;
                        transition: all 0.3s ease;
                    }
                    
                    .input-area-with-messages {
                        justify-content: flex-start;
                        padding-top: 0.5rem;
                    }
                    
                    .input-container {
                        width: 100%;
                        max-width: 600px;
                        transition: all 0.3s ease;
                    }
                    
                    .messages-container {
                        flex: 1;
                        overflow-y: auto;
                        padding-bottom: 0.5rem;
                    }
                    
                    @keyframes slideIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    .message-animation {
                        animation: slideIn 0.3s ease forwards;
                    }
                    
                    .formatted-text h1 {
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin: 0.5rem 0;
                    }
                    
                    .formatted-text h2 {
                        font-size: 1.3rem;
                        font-weight: bold;
                        margin: 0.5rem 0;
                    }
                    
                    .formatted-text h3 {
                        font-size: 1.1rem;
                        font-weight: bold;
                        margin: 0.5rem 0;
                    }
                    
                    .formatted-text p {
                        margin: 0.5rem 0;
                        line-height: 1.5;
                    }
                    
                    .formatted-text ul, .formatted-text ol {
                        margin: 0.5rem 0;
                        padding-left: 1.5rem;
                    }
                    
                    .formatted-text li {
                        margin: 0.25rem 0;
                    }
                    
                    .formatted-text strong {
                        fontWeight: bold;
                    }
                    
                    .formatted-text em {
                        font-style: italic;
                    }
                    
                    .formatted-text code {
                        background-color: #f3f4f6;
                        padding: 0.1rem 0.3rem;
                        border-radius: 0.25rem;
                        font-family: monospace;
                    }
                    
                    .ai-message {
                        background-color: #f9fafb;
                        padding: 0.75rem 1rem;
                        border-radius: 0.75rem;
                        max-width: 80%;
                    }
                `}
            </style>
            
            <div className="fixed bottom-6 right-6 z-50">
                {/* Tooltip */}
                {showTooltip && (
                    <div className="absolute bottom-20 right-0 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap">
                        <div className="font-medium">Kyra</div>
                        <div className="text-xs text-gray-300">Click on me</div>
                        {/* Tooltip arrow */}
                        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                )}

                {/* Login message */}
                {showLoginMessage && (
                    <div className="absolute bottom-20 right-0 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap animate-pulse">
                        Login first
                        {/* Message arrow */}
                        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-600"></div>
                    </div>
                )}

                {/* Dolphin Head Container */}
                <div
                    className="relative w-16 h-16 transition-all duration-200 ease-out cursor-pointer"
                    style={{
                        transform: `translateY(${bounceOffset}px)`,
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                    }}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={handleRobotClick}
                >
                    {/* Main Head - 3D Blue Dolphin */}
                    <div className="relative w-full h-full">
                        {/* Head Base - Blue gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                            {/* 3D Lighting Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full"></div>
                            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-blue-800/40 via-transparent to-transparent rounded-full"></div>
                        </div>

                        {/* Dolphin Features */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {/* Left Eye */}
                            <div className="relative w-3 h-3">
                                <div className="absolute inset-0 bg-white rounded-full shadow-inner">
                                    <div
                                        className="absolute top-0.5 left-0.5 w-2 h-2 bg-gray-800 rounded-full transition-all duration-100"
                                        style={{
                                            ...calculateEyePosition(),
                                            transform: isBlinking ? 'scaleY(0.1)' : calculateEyePosition().transform
                                        }}
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full opacity-80"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Eye */}
                            <div className="relative w-3 h-3">
                                <div className="absolute inset-0 bg-white rounded-full shadow-inner">
                                    <div
                                        className="absolute top-0.5 left-0.5 w-2 h-2 bg-gray-800 rounded-full transition-all duration-100"
                                        style={{
                                            ...calculateEyePosition(),
                                            transform: isBlinking ? 'scaleY(0.1)' : calculateEyePosition().transform
                                        }}
                                    >
                                        {/* Eye sparkle */}
                                        <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full opacity-80"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dolphin Mouth */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <div
                                className={`w-4 h-1 bg-gray-800 rounded-full transition-all duration-300 ${
                                    isTalking ? 'h-2 bg-gray-700' : 'h-0.5'
                                }`}
                                style={{
                                    transform: isTalking ? 'scaleY(1.5)' : 'scaleY(1)'
                                }}
                            ></div>
                        </div>

                        {/* Cheek highlights for 3D effect */}
                        <div className="absolute top-3 left-1 w-2 h-2 bg-white/20 rounded-full blur-sm"></div>
                        <div className="absolute top-3 right-1 w-2 h-2 bg-white/20 rounded-full blur-sm"></div>
                    </div>

                    {/* Bounce shadow */}
                    <div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-black/20 rounded-full blur-sm transition-all duration-200"
                        style={{
                            opacity: bounceOffset === 0 ? 0.3 : 0.1,
                            transform: `translateX(-50%) scale(${bounceOffset === 0 ? 1 : 0.8})`
                        }}
                    ></div>
                </div>
            </div>

            {/* Chat Dialog */}
            {showDialog && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto flex h-[80vh]">
                        {/* Sidebar */}
                        {showSidebar && (
                            <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
                                <button 
                                    onClick={createNewChat}
                                    className="flex items-center gap-2 m-4 p-3 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors"
                                >
                                    <Plus className="h-5 w-5" />
                                    <span>New Chat</span>
                                </button>
                                
                                <div className="flex-1 overflow-y-auto">
                                    {Object.entries(groupChatsByDate()).map(([date, chats]) => (
                                        <div key={date}>
                                            <div className="px-4 py-2 text-sm font-medium text-gray-500 sticky top-0 bg-gray-50 z-10">
                                                {date}
                                            </div>
                                            {chats.map((chat) => (
                                                <div 
                                                    key={chat.id} 
                                                    onClick={() => switchChat(chat.id)} 
                                                    className={`p-3 mx-2 my-1 rounded-lg cursor-pointer flex items-center ${currentChatId === chat.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200'}`}
                                                >
                                                    <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                                                    <span className="truncate">{chat.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="p-4 border-t border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div className="text-sm font-medium truncate">{user?.name || 'User'}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Main Chat Content */}
                        <div className="flex-1 flex flex-col">
                            {/* Dialog Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <button 
                                        className="p-1 rounded hover:bg-gray-100"
                                        onClick={() => setShowSidebar(!showSidebar)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                    {/* Dolphin emoji in dialog */}
                                    <div className="text-2xl">🐬</div>
                                    <h3 className="text-lg font-semibold text-gray-800">Kyra</h3>
                                </div>
                                <button
                                    onClick={() => setShowDialog(false)}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Dialog Content */}
                            <div className="flex-1 p-4 flex flex-col overflow-hidden">
                                {/* Centered Welcome Message with Dolphin on the left */}
                                {messages.length === 0 && (
                                    <div className="flex-1 flex flex-col items-center justify-center mb-4">
                                        <div className="flex items-center justify-center mb-2">
                                            <div className="text-4xl mr-3">🐬</div>
                                            <div className="text-xl font-medium text-gray-800">Hello, I'm Kyra.</div>
                                        </div>
                                        <div className="text-gray-600">What do you want today?</div>
                                    </div>
                                )}

                                {/* Chat Messages */}
                                <div className="messages-container space-y-3 pr-2">
                                    {messages.map((msg, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} message-animation`}
                                            style={{ animationDelay: `${idx * 0.05}s` }}
                                        >
                                            <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-blue-100 text-blue-900' : 'ai-message'}`}>
                                                {msg.role === 'user' ? (
                                                    msg.text
                                                ) : (
                                                    <TextFormatter text={msg.text} />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start message-animation">
                                            <div className="ai-message text-gray-400 animate-pulse">
                                                Thinking...
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area - Centered when no messages, moves down when messages appear */}
                                <div 
                                    ref={inputAreaRef}
                                    className={`input-area-centered ${messages.length > 0 ? 'input-area-with-messages' : ''}`}
                                >
                                    <div className="input-container flex items-end gap-2 pt-2 border-t border-gray-200">
                                        {/* Upload Icon */}
                                        <label className="cursor-pointer flex items-center">
                                            <input type="file" accept="image/*,.pdf,.doc,.docx" className="hidden" onChange={handleUpload} />
                                            <span title="Upload file/photo" className="p-2 rounded-full hover:bg-gray-200">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M16.5 16.5L12 12m0 0l-4.5 4.5M12 12V21M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h3l2-3h4l2 3h3a2 2 0 012 2v12a2 2 0 01-2 2z"/>
                                                </svg>
                                            </span>
                                        </label>
                                        <textarea
                                            ref={textareaRef}
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Message Kyra..."
                                            className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                            rows="2"
                                            disabled={isLoading}
                                        />
                                        <button
                                            onClick={handleMicClick}
                                            className={`p-2 rounded-full transition-all duration-200 ${isListening ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                            title={isListening ? 'Stop listening' : 'Speak'}
                                            disabled={isLoading}
                                        >
                                            <Mic className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={!prompt.trim() || isLoading}
                                            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white transition-colors duration-200"
                                            title="Send"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIAssistant;