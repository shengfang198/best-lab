import express from 'express';
import { login, register, getProfile, updateProfile, logout } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
console.log('🔄 Auth routes module loaded');

// Public routes
router.post('/login', login);
router.post('/register', register);

// Test route
router.get('/test', (req, res) => {
  console.log('🧪 Test route hit');
  res.json({ message: 'Auth routes working' });
});

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.post('/logout', authenticateToken, logout);

export default router;
