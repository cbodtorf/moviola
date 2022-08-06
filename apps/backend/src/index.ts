import build from './app';
import { createLogger } from '@moviola/logger';

const logger = createLogger('backend-service');

/**
 * @description Builds our app and and starts the server
 */
async function startServer() {
  try {
    // Build app
    const app = build({});

    // Ensure port environment variable is number
    const envPort = parseInt(process.env.PORT || '');
    const port = Number.isInteger(envPort) ? envPort : 3333;

    const host = '0.0.0.0';
    const url = await app.listen({ port, host });

    const [protocol, baseUrl] = url.split(':');
    const serverUrl = `${protocol}:${baseUrl}:${
      process.env.SERVICE_PORT || 3333
    }`;

    logger.info(`🚀 Server ready at ${serverUrl}`);
    logger.info(`Try your health check at: ${serverUrl}/api/health`);
  } catch (error) {
    logger.error(error, 'Unknown Error');
    process.exit(1);
  }
}

startServer();

// Handle exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error(error, 'uncaught exception received, shutting down server');
  process.exit(1);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down server');
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down server');
  process.exit(1);
});
