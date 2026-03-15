
import { AppError } from "@/common/errors/AppError";
import logger from "@/config/logger";
import type { Request, Response, NextFunction } from "express";


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Default to 500 if not an operational error
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const isOperational = err instanceof AppError ? err.isOperational : false;

  // Log non-operational (unexpected) errors as critical
  if (!isOperational) {
    logger.error("Unexpected error:", {
      error: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });
  }

  const response: Record<string, any> = {
    error: isOperational ? err.message : "Internal Server Error",
    message: isOperational ? err.message : "Something went wrong",
    requestId: res.locals.requestId || undefined,
  };

  // Include validation errors if present
  if (err instanceof AppError && err.errors) {
    response.errors = err.errors;
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};