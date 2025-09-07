import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import AIAssistant from "@/components/AIAssistant";


const ForgotPasswordForm = ({ onBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    return newErrors;
  };

  const validateCode = () => {
    const newErrors = {};
    
    if (!formData.code.trim()) {
      newErrors.code = 'The verification code is required';
    } else if (formData.code.length !== 6) {
      newErrors.code = 'The code must contain 6 characters';
    }
    
    return newErrors;
  };

  const validatePasswords = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'The new password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'The password must contain at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Password confirmation is required';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    
    const newErrors = validateEmail();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Code sent to:', formData.email);
      setStep(2);
    } catch (error) {
      console.error('Send code error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    const newErrors = validateCode();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate code verification (in real app, this would be validated by backend)
      if (formData.code === '123456') {
        setStep(3);
      } else {
        setErrors({ code: 'Invalid verification code' });
      }
    } catch (error) {
      console.error('Verify code error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    const newErrors = validatePasswords();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password reset successful');
      setStep(4);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Forgot password ?
              </h2>
              <p className="text-gray-400">
                Enter your email address to receive a reset code
              </p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="Enter your email address"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Sending in progress...' : 'Send code'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Back to login
              </button>
            </div>
          </form>
        );

      case 2:
        return (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Verification code
              </h2>
              <p className="text-gray-400">
                Enter the 6-digit code sent to {formData.email}
              </p>
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-1">
                Verification code
              </label>
              <Input
                id="code"
                name="code"
                type="text"
                value={formData.code}
                onChange={handleInputChange}
                error={errors.code}
                placeholder="Enter the 6-digit code"
                maxLength={6}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Verification...' : 'Check the code'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Change email address
              </button>
            </div>
          </form>
        );

      case 3:
        return (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                New password
              </h2>
              <p className="text-gray-400">
                Create a new secure password
              </p>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">
                New password
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                error={errors.newPassword}
                placeholder="Enter your new password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                placeholder="Confirm your new password"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Resetting...' : 'Reset password'}
            </Button>
          </form>
        );

      case 4:
        return (
          <div className="text-center space-y-4">
            <div className="text-green-400 text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Password reset !
            </h2>
            <p className="text-gray-400 mb-6">
              Your password has been successfully reset.
            </p>
            
            <Button
              onClick={onBackToLogin}
              className="w-full"
            >
              Login
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="p-6">
        {renderStep()}
      </div>
    </Card>
  );
};

export default ForgotPasswordForm;

