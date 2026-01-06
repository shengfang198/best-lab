import React, { useState } from 'react';
import { authAPI } from '../api.js';

const SignupModal = ({ isOpen, onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }

    if (!formData.firstname.trim()) {
      setError('First name is required');
      return false;
    }

    if (!formData.lastname.trim()) {
      setError('Last name is required');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email is invalid');
      return false;
    }

    if (!formData.password) {
      setError('Password is required');
      return false;
    } else if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (!formData.confirmPassword) {
      setError('Please confirm your password');
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (!acceptedTerms) {
      setError('You must accept the terms and conditions');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (validateForm()) {
      try {
        const response = await authAPI.register(formData);
        console.log('Signup successful:', response);
        // Close modal after successful signup
        onClose();
        // Reset form
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          firstname: '',
          lastname: ''
        });
        setAcceptedTerms(false);
      } catch (err) {
        console.error('Signup error:', err);
        setError(err.message || 'Signup failed');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-neutral-800/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-sm w-full mx-4 p-8 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Sign Up</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              placeholder="Choose a username"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-white/80 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                placeholder="First name"
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-white/80 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              placeholder="Confirm your password"
            />
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-white/80">
              I agree to the{' '}
              <a href="#" className="text-white hover:text-white/80 underline">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-white hover:text-white/80 underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded-lg p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/20 hover:bg-white/30 border border-white/30 rounded-full px-6 py-3 text-white font-medium transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Already have an account?{' '}
            <button
              onClick={() => {
                onClose();
                onLoginClick();
              }}
              className="text-white hover:text-white/80 underline bg-transparent border-none p-0 cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
