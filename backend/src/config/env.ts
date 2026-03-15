import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

function parseCorsOrigins(value: string | undefined): string[] {
  const origins = (value ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return origins.length > 0 ? origins : ['http://localhost:5173'];
}

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  NODE_ENV: z.string().trim().min(1).default('development'),
  CORS_ORIGIN: z
    .string()
    .trim()
    .optional()
    .transform((value) => parseCorsOrigins(value)),
  NASA_API_KEY: z.string().trim().min(1).default('DEMO_KEY'),
  NASA_BASE_URL: z.string().trim().url().default('https://api.nasa.gov'),
  NASA_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
  CACHE_TTL_MS: z.coerce.number().int().positive().default(10 * 60 * 1000),
  CACHE_MAX_ENTRIES: z.coerce.number().int().positive().default(250),
  SHUTDOWN_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const issues = parsedEnv.error.issues
    .map((issue) => `${issue.path.join('.') || 'env'}: ${issue.message}`)
    .join('; ');

  throw new Error(`Invalid environment configuration. ${issues}`);
}

export const env = parsedEnv.data;

export type Env = z.infer<typeof envSchema>;