import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Dashboard from './components/Dashboard';
import { apiUtils } from './api.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuthStatus = async () => {
      try {
        const isAuth = apiUtils.isAuthenticated();
        if (isAuth) {
          // Optional: Verify token is still valid with a quick API call
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid auth data
        apiUtils.clearAuth();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    apiUtils.clearAuth();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <Landing onLoginSuccess={handleLoginSuccess} />
  );
}

export default App;
