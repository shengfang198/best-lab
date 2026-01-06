// For production, use environment variable or fallback to a placeholder
const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL || "https://best-lab.onrender.com/api" // Replace with your actual backend URL
  : "http://localhost:8000/api";

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Helper function to set auth token in localStorage
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    const response = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (response.success && response.data.token) {
      setAuthToken(response.data.token);
    }

    return response;
  },

  // Login user
  login: async (credentials) => {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data.token) {
      setAuthToken(response.data.token);
    }

    return response;
  },

  // Logout user
  logout: async () => {
    try {
      const response = await apiRequest("/auth/logout", {
        method: "POST",
      });

      // Clear token regardless of response
      setAuthToken(null);
      return response;
    } catch (error) {
      // Clear token even if request fails
      setAuthToken(null);
      throw error;
    }
  },

  // Get user profile
  getProfile: async () => {
    return await apiRequest("/auth/profile");
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return await apiRequest("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    return await apiRequest("/health");
  },
};

// Utility functions
export const apiUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getAuthToken();
  },

  // Get current user from localStorage (if stored)
  getCurrentUser: () => {
    const userStr = localStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Set current user in localStorage
  setCurrentUser: (user) => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  },

  // Clear all auth data
  clearAuth: () => {
    setAuthToken(null);
    localStorage.removeItem("currentUser");
  },
};

export default {
  auth: authAPI,
  health: healthAPI,
  utils: apiUtils,
};
