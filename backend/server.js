import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './db.js';
import authRoutes from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
console.log('📦 Auth routes imported:', !!authRoutes);
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
 
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:5173',  // Development
      'http://localhost:3000',  // Alternative dev port
      'https://localhost:3000', // HTTPS dev
      'http://localhost:8000',  // Same port as backend (for SPA serving)
      'https://best-lab.vercel.app', // Vercel deployment (example)
      /\.vercel\.app$/,  // Any Vercel domain
      /^https?:\/\/.*\.onrender\.com$/, // Any Render domain (more permissive)
      /^https?:\/\/.*\.render\.com$/, // Alternative Render domain pattern
    ];

    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Debug middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.originalUrl}`);
  next();
});

// Initialize database connection (non-blocking)
testConnection().then(success => {
  if (!success) {
    console.log('⚠️  Database not available - continuing without DB connection');
  }
}).catch(err => {
  console.log('⚠️  Database initialization error:', err.message);
});

// Health check endpoint (before other routes)
app.get('/api/health', (req, res) => {
  console.log('🏥 Health check requested');
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Best Lab API'
  });
});

// Routes
console.log('🔧 Registering auth routes:', typeof authRoutes, authRoutes?.stack?.length || 'no stack');
app.use('/api/auth', authRoutes);
console.log('✅ Auth routes registered at /api/auth');

// Test route at root level
app.get('/api/test', (req, res) => {
  console.log('🧪 Root test route hit');
  res.json({ message: 'Root API working' });
});

// Catch all handler: serve React app for non-API routes
app.use((req, res) => {
  // Only serve index.html for non-API routes
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  } else {
    // API routes that don't exist should return 404 JSON
    res.status(404).json({
      error: 'API Route not found',
      path: req.originalUrl,
      method: req.method
    });
  }
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    // eslint-disable-next-line no-undef
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
