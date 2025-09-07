// pages/ELearning.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const departments = [
  { name: 'Artificial Intelligence Engineering', icon: '🤖' },
  { name: 'Software Engineering', icon: '💻' },
  { name: 'Computer Engineering', icon: '🖥️' },
  { name: 'Information Systems Engineering', icon: '📊' },
  { name: 'Mechatronics Engineering', icon: '⚙️' },
  { name: 'Law', icon: '⚖️' },
  { name: 'Economics', icon: '💹' },
  { name: 'Architecture', icon: '🏛️' },
  { name: 'Civil Engineering', icon: '🏗️' },
];

const API_URL = 'http://127.0.0.1:8000/api/auth/ai-courses/';

const ELearning = () => {
  const [selectedDept, setSelectedDept] = useState(null);
  const [aiCourses, setAICourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (selectedDept === 'Artificial Intelligence Engineering') {
      setLoading(true);
      axios.get(API_URL)
        .then((res) => {
          setAICourses(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [selectedDept]);

  const handleDeptClick = (dept) => {
    setSelectedDept(dept.name);
    setSelectedCourse(null);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">E-learning Departments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {departments.map((dept) => (
          <div
            key={dept.name}
            className={`flex flex-col items-center bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg hover:bg-blue-900/30 hover:border-blue-400/40 transition-all duration-300 cursor-pointer group ${selectedDept === dept.name ? 'ring-4 ring-blue-400' : ''}`}
            onClick={() => handleDeptClick(dept)}
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black/40 mb-4 border-4 border-blue-400 group-hover:scale-105 transition-transform text-5xl">
              {dept.icon}
            </div>
            <div className="text-white text-lg font-semibold text-center group-hover:text-blue-300 transition-colors">
              {dept.name}
            </div>
          </div>
        ))}
      </div>
      {/* AI Courses Section */}
      {selectedDept === 'Artificial Intelligence Engineering' && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 overflow-y-auto p-6">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-4xl relative">
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-blue-400"
              onClick={() => setSelectedDept(null)}
              title="Close"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-blue-300 mb-6 text-center">Artificial Intelligence Engineering Courses</h2>
            {loading ? (
              <div className="text-white text-center">Loading courses...</div>
            ) : selectedCourse ? (
              <div>
                <button
                  className="mb-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-500"
                  onClick={handleBackToCourses}
                >
                  &larr; Back to Courses
                </button>
                <h3 className="text-2xl font-bold text-blue-200 mb-2">{selectedCourse.title}</h3>
                <a href={selectedCourse.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline mb-4 block">View Source</a>
                <div className="bg-gray-800 rounded-lg p-4 text-white whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
                  {selectedCourse.content}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Browse Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aiCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer border border-blue-400/30 hover:border-blue-400"
                      onClick={() => handleCourseClick(course)}
                    >
                      <h4 className="text-lg font-bold text-blue-200 mb-2">{course.title}</h4>
                      <div className="text-white text-sm line-clamp-3 mb-2">{course.content.slice(0, 200)}...</div>
                      <span className="text-blue-400 text-xs">Read More</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ELearning;