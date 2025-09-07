import React from 'react';
import AIAssistant from './AIAssistant';

// ErrorBoundary component for error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }
    return this.props.children;
  }
}

function AuthLayout(props) {
  return (
    <div>
      {/* ...existing layout code... */}
      <ErrorBoundary>
        <AIAssistant />
      </ErrorBoundary>
      {/* ...existing layout code... */}
    </div>
  );
}

export default AuthLayout;