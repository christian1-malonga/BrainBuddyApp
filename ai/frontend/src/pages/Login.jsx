import React, { useState } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import AIAssistant from "@/components/AIAssistant";



const Login = ({ onNavigateToRegister }) => {
  const [currentView, setCurrentView] = useState('login'); // 'login' | 'forgot-password'

  const handleForgotPassword = () => {
    setCurrentView('forgot-password');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onBackToLogin={handleBackToLogin}
          />
        );
      case 'login':
      default:
        return (
          <LoginForm
            onForgotPassword={handleForgotPassword}
            onRegister={onNavigateToRegister}
          />
        );
    }
  };

  return (
    <AuthLayout
      title="LOG IN"
      subtitle="Log in to BrainBuddy"
    >
      {renderCurrentView()}
    </AuthLayout>
  );
};

export default Login;

