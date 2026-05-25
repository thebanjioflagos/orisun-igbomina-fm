import pino from 'pino';

// Helper to determine if we should attempt pretty-printing in development
const isDev = process.env.NODE_ENV !== 'production';

// Only load pretty transport if we are in development
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: isDev ? {
    target: 'pino-pretty',
    options: { colorize: true }
  } : undefined,
});

export default logger;
