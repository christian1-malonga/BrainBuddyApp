import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import AIAssistant from "@/components/AIAssistant";


const ForgotPassword = ({ onNavigateToLogin }) => {
  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Reset your password"
    >
      <ForgotPasswordForm
        onBackToLogin={onNavigateToLogin}
      />
    </AuthLayout>
  );
};

export default ForgotPassword;

