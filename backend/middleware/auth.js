import Session from '../models/Session.js';
import User from '../models/User.js';

// Authentication middleware
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'No token provided'
      });
    }

    // Check if session exists and is not expired
    const session = await Session.findValidByToken(token);

    if (!session) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid or expired token'
      });
    }

    // Get user information
    const user = await User.findById(session.userId);

    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'User not found'
      });
    }

    // Attach user info to request
    req.user = {
      userId: user.userId,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      firstname: user.firstname,
      lastname: user.lastname
    };
    req.token = token;

    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Authentication failed'
    });
  }
};

// Optional authentication (doesn't fail if no token)
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const session = await Session.findValidByToken(token);

      if (session) {
        const user = await User.findById(session.userId);

        if (user) {
          req.user = {
            userId: user.userId,
            username: user.username,
            email: user.email,
            roleId: user.roleId,
            firstname: user.firstname,
            lastname: user.lastname
          };
          req.token = token;
        }
      }
    }

    next();

  } catch (error) {
    console.error('Optional auth middleware error:', error);
    // Don't fail, just continue without user info
    next();
  }
};
