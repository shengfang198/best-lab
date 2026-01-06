import React, { useState, useEffect } from 'react';
import { authAPI } from '../api.js';

const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      if (response.success) {
        setUser(response.data.user);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      onLogout();
    } catch (err) {
      console.error('Logout error:', err);
      // Even if logout fails on server, clear local state
      onLogout();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
          <p className="text-neutral-900 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button
            onClick={handleLogout}
            className="bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="border-b border-neutral-200 backdrop-blur-md bg-white/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-neutral-900">Dashboard</h1>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">
              Welcome back, {user?.firstname || 'User'}!
            </h2>
            <p className="text-neutral-600 text-lg">
              Great to see you again. Here's your dashboard overview.
            </p>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-neutral-900 font-medium">Profile</h3>
            </div>
            <div className="space-y-1">
              <p className="text-neutral-600 text-sm">Username: <span className="text-neutral-900 font-medium">{user?.username}</span></p>
              <p className="text-neutral-600 text-sm">Email: <span className="text-neutral-900 font-medium">{user?.email}</span></p>
              <p className="text-neutral-600 text-sm">Name: <span className="text-neutral-900 font-medium">{user?.firstname} {user?.lastname}</span></p>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-neutral-900 font-medium">Account Status</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 text-sm font-medium">Active</span>
              </div>
              <p className="text-neutral-600 text-sm">Role: <span className="text-neutral-900 font-medium">User</span></p>
              <p className="text-neutral-600 text-sm">Member since: <span className="text-neutral-900 font-medium">{new Date(user?.createdAt).toLocaleDateString()}</span></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
