import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import AIAssistant from "@/components/AIAssistant";


const Register = ({ onNavigateToLogin }) => {
  return (
    <AuthLayout
      title="Registration"
      subtitle="Create your BrainBuddy account"
    >
      <RegisterForm
        onLogin={onNavigateToLogin}
      />
    </AuthLayout>
  );
};

export default Register;

