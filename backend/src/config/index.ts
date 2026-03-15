import { env } from "./env";

interface Config {
  port: number;
  nodeEnv: string;
  corsOrigins: string[];
  allowAnyCorsOrigin: boolean;
  nasaApiKey: string;
  nasaBaseUrl: string;
  nasaTimeoutMs: number;
  cacheTtlMs: number;
  cacheMaxEntries: number;
  shutdownTimeoutMs: number;
}

const config: Config = {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  corsOrigins: env.CORS_ORIGIN,
  allowAnyCorsOrigin: env.CORS_ORIGIN.includes('*'),
  nasaApiKey: env.NASA_API_KEY,
  nasaBaseUrl: env.NASA_BASE_URL,
  nasaTimeoutMs: env.NASA_TIMEOUT_MS,
  cacheTtlMs: env.CACHE_TTL_MS,
  cacheMaxEntries: env.CACHE_MAX_ENTRIES,
  shutdownTimeoutMs: env.SHUTDOWN_TIMEOUT_MS,
};

export default config;
