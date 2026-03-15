import expressWinston from "express-winston";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "logs");

// Rotating transport for HTTP access logs
const httpRotate = new DailyRotateFile({
  dirname: LOG_DIR,
  filename: "http-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
  zippedArchive: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

// Request logger — logs all incoming requests
export const requestLogger = expressWinston.logger({
  transports: [httpRotate],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  meta: true,
  msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  expressFormat: false,
  colorize: false,
  headerBlacklist: ["authorization", "cookie"],
  requestFilter: (req, propName) => {
    if (propName === "password" || propName === "token") {
      return "[FILTERED]";
    }
    return req[propName];
  },
  // Skip health check endpoint
  ignoreRoute: (req) => req.path === "/api/health",
});

// Error logger — logs failed requests with stack traces
export const errorLogger = expressWinston.errorLogger({
  transports: [
    new DailyRotateFile({
      dirname: LOG_DIR,
      filename: "http-error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "30d",
      zippedArchive: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});