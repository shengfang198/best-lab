import User from '../models/User.js';
import Session from '../models/Session.js';

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid credentials'
      });
    }

    // Generate session token
    const token = `session_${Date.now()}_${user.userId}`;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create session
    await Session.create(user.userId, token, expiresAt);

    // Update user's last login
    await user.updateLastLogin();

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toPublicData(),
        token,
        expiresAt
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Login failed'
    });
  }
};

// Register new user
export const register = async (req, res) => {
  try {
    const { username, email, password, firstname, lastname } = req.body;

    // Validate input
    if (!username || !email || !password || !firstname || !lastname) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Invalid email format'
      });
    }

    // Check if user already exists
    const userExists = await User.exists(email, username);
    if (userExists) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'User with this email or username already exists'
      });
    }

    // Create user
    const newUser = await User.create({ username, email, password, firstname, lastname });

    // Generate session token
    const token = `session_${Date.now()}_${newUser.userId}`;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create session
    await Session.create(newUser.userId, token, expiresAt);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: newUser.toPublicData(),
        token,
        expiresAt
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Registration failed'
    });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // From auth middleware

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'Not found',
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: user.toPublicData()
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to get profile'
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // From auth middleware
    const { firstname, lastname, username } = req.body;

    // Validate input
    if (!firstname || !lastname || !username) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'First name, last name, and username are required'
      });
    }

    // Check if username is taken by another user
    const existingUserByUsername = await User.findByUsername(username);
    if (existingUserByUsername && existingUserByUsername.userId !== userId) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Username already taken'
      });
    }

    // Get current user and update
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'Not found',
        message: 'User not found'
      });
    }

    const updatedUser = await user.update({ firstname, lastname, username });

    if (!updatedUser) {
      return res.status(500).json({
        error: 'Server error',
        message: 'Failed to update profile'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: updatedUser.toPublicData()
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to update profile'
    });
  }
};

// Logout (invalidate session)
export const logout = async (req, res) => {
  try {
    const token = req.token; // From auth middleware

    // Delete session
    const deleted = await Session.deleteByToken(token);

    if (!deleted) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Session not found'
      });
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Logout failed'
    });
  }
};
