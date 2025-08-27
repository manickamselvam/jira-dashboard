require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const jwtAuth = require('./middleware/jwtAuth');
const basicAuth = require('./middleware/basicAuth');
const personalTokenAuth = require('./middleware/personalTokenAuth');
const integrationRoutes = require('./routes/integrationRoutes');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true, // 👈 Vite frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies & authentication headers if needed
  })
);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/integrations', [basicAuth, personalTokenAuth], integrationRoutes);
app.use('/api/app', jwtAuth, (req, res) =>
  res.json({ message: 'App access granted' })
);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log('Server running'));
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
