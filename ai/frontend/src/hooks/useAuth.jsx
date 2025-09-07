import { useState, useEffect, createContext, useContext } from 'react';

// Authentication context
const AuthContext = createContext();

// Authentication provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on loading
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        // Check the validity of the token with the API
        const userData = await validateToken(token);
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('authToken');
        }
      }
    } catch (error) {
      console.error('Authentication verification error:', error);
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      let errorData = null;
      if (!response.ok) {
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { detail: 'Login failure' };
        }
        // Show all backend error fields if available
        const errorMsg = errorData.detail || errorData.non_field_errors?.join(' ') || JSON.stringify(errorData) || 'Login failure';
        return { success: false, error: errorMsg };
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      setUser({
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.first_name,
        surName: data.user?.last_name,
      });
      setIsAuthenticated(true);
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          first_name: userData.name,
          last_name: userData.surName,
          password: userData.password,
        }),
      });

      let errorData = null;
      if (!response.ok) {
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { detail: 'Registration failure' };
        }
        // Show all backend error fields if available
        const errorMsg = errorData.detail || errorData.non_field_errors?.join(' ') || JSON.stringify(errorData) || 'Registration failure';
        return { success: false, error: errorMsg };
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const resetPassword = async (email) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset code');
      }

      return { success: true };
    } catch (error) {
      console.error('Reset error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setIsLoading(true);
      
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const data = await response.json();
      setUser(data.user);
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used in an AuthProvider');
  }
  
  return context;
};

// Utility function to validate the token
const validateToken = async (token) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return {
      id: data.id,
      email: data.email,
      name: data.first_name,
      surName: data.last_name,
      studentNumber: data.student_number,
      faculty: data.faculty,
      department: data.department,
    };
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
};

export default useAuth;

