import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import routes from './routes/index';
import healthRouter from './routes/health/health.routes';
import { errorHandler } from './middlewares/errorHandler';
import { createCorsOptions } from './config/cors';
import swaggerSpec from './config/swagger';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { attachRequestContext } from './middlewares/requestContext';
import { errorLogger, requestLogger } from './middlewares/requestLogger';

export function createApp(): express.Application {
  const app: express.Application = express();

  app.disable('x-powered-by');

  app.use(attachRequestContext);
  app.use(requestLogger);
  app.use(helmet());
  app.use(cors(createCorsOptions()));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false }));

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/health', healthRouter);
  app.use(routes);

  app.use(notFoundHandler);
  app.use(errorLogger);
  app.use(errorHandler);

  return app;
}

const app = createApp();

export default app;
