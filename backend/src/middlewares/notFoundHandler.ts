import { NotFoundError } from '@/common/errors/httpErrors';
import type { NextFunction, Request, Response } from 'express';

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} does not exist`));
}
