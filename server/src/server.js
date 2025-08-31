require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');
const jwtAuth = require('./middleware/jwtAuth');
const basicAuth = require('./middleware/basicAuth');
const personalTokenAuth = require('./middleware/personalTokenAuth');
const integrationRoutes = require('./routes/integrationRoutes');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const taskBoardRoutes = require('./routes/taskBoardRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/taskboard', taskBoardRoutes);
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
