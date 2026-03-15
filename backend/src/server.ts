import http from 'node:http';
import app from './app';
import config from './config';
import logger from './config/logger';

export function createServer() {
  return http.createServer(app);
}

const server = createServer();
let isShuttingDown = false;

function shutdown(signal: 'SIGINT' | 'SIGTERM') {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  logger.info('Received shutdown signal', { signal });

  const forceShutdownTimer = setTimeout(() => {
    logger.error('Forced shutdown after timeout', {
      timeoutMs: config.shutdownTimeoutMs,
    });
    process.exit(1);
  }, config.shutdownTimeoutMs);

  forceShutdownTimer.unref();

  server.close((error) => {
    clearTimeout(forceShutdownTimer);

    if (error) {
      logger.error('Failed to shut down HTTP server cleanly', { error });
      process.exit(1);
      return;
    }

    logger.info('HTTP server closed');
    process.exit(0);
  });
}

server.on('error', (error) => {
  logger.error('Failed to start HTTP server', { error });
  process.exit(1);
});

server.listen(config.port, () => {
  logger.info('HTTP server listening', {
    environment: config.nodeEnv,
    port: config.port,
  });
});

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled promise rejection', { reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', { error });
  process.exit(1);
});

export default server;
