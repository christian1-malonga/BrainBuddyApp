import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './index.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from './pages/Navigation';
import Transportation from './pages/Transportation';
import ELearning from './pages/ELearning';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

// Main content of the app - now wrapped with Router at the top level
const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('login'); // 'login' | 'register'
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-xl mb-4">
            <h1 className="text-3xl font-bold text-white tracking-wider">
              BrainBuddy
            </h1>
          </div>
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const handleNavigateToRegister = () => {
      setCurrentPage('register');
    };

    const handleNavigateToLogin = () => {
      setCurrentPage('login');
    };

    switch (currentPage) {
      case 'register':
        return <Register onNavigateToLogin={handleNavigateToLogin} />;
      case 'login':
      default:
        return <Login onNavigateToRegister={handleNavigateToRegister} />;
    }
  }

  // Authenticated routes - no Router wrapper needed here since it's at the top level
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/navigation" element={
        <ProtectedRoute>
          <Navigation />
        </ProtectedRoute>
      } />
      <Route path="/transportation" element={
        <ProtectedRoute>
          <Transportation />
        </ProtectedRoute>
      } />
      <Route path="/e-learning" element={
        <ProtectedRoute>
          <ELearning />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

// App component wrapped with AuthProvider and Router at the top level
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;