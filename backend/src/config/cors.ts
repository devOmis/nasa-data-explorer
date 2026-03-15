import type { CorsOptions } from 'cors';
import config from '.';

export function createCorsOptions(): CorsOptions {
  return {
    origin: config.allowAnyCorsOrigin ? true : config.corsOrigins,
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Request-Id'],
    exposedHeaders: ['X-Request-Id'],
  };
}
