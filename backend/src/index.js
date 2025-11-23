import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { sequelize } from './db.js';
import authRoutes from './routes/auth.js';
import employeeRoutes from './routes/employees.js';
import teamRoutes from './routes/teams.js';
import { errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const logger = pino({ level: process.env.NODE_ENV === 'production' ? 'info' : 'debug' });

app.use(cors({ origin: true, credentials: false }));
app.use(express.json());

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/teams', teamRoutes);

// Error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to the HRMS API');
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // for dev; use migrations in prod
    app.listen(port, () => logger.info(`HRMS API running on :${port}`));
  } catch (err) {
    logger.error(err, 'Failed to start server');
    process.exit(1);
  }
})();