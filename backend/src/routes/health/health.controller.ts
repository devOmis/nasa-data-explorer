import type { Request, Response } from 'express';
import { getHealthStatus } from './health.service';

export function healthStatus(_req: Request, res: Response) {
  res.json(getHealthStatus());
}
