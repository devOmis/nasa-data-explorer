import { resolve } from 'node:path';
import swaggerJsdoc from 'swagger-jsdoc';
import type {
  Options as SwaggerJSDocOptions,
  SwaggerDefinition,
} from 'swagger-jsdoc';
import config from '.';

const backendRoot = process.cwd();
console.log(backendRoot);
const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.1.0',
  info: {
    title: 'NASA Data Explorer API',
    version: '0.1.0',
    description:
      'API for exploring NASA datasets and related project endpoints.',
  },
  servers: [
    {
      url: `http://localhost:${config.port}`,
    },
  ],
};

const swaggerOptions: SwaggerJSDocOptions = {
  definition: swaggerDefinition,
  apis: [
    resolve(backendRoot, 'src/routes/**/*.ts'),
    resolve(backendRoot, 'src/routes/**.docs.ts'),
    resolve(backendRoot, 'dist/routes/**/*.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
