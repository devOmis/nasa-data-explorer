import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const LOG_DIR = path.join(process.cwd(), "logs");

// Custom format for console output
const consoleFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
  return `${timestamp} [${level}]: ${stack || message}${metaStr}`;
});

// Rotating file transport — combined logs
const combinedRotate = new DailyRotateFile({
  dirname: LOG_DIR,
  filename: "app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
  zippedArchive: true,
  level: "info",
  format: combine(timestamp(), errors({ stack: true }), json()),
});

// Rotating file transport — errors only
const errorRotate = new DailyRotateFile({
  dirname: LOG_DIR,
  filename: "error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "30d",
  zippedArchive: true,
  level: "error",
  format: combine(timestamp(), errors({ stack: true }), json()),
});

// Handle rotation events
combinedRotate.on("rotate", (oldFile, newFile) => {
  logger.info(`Log rotated: ${oldFile} → ${newFile}`);
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: process.env.APP_NAME || "api" },
  transports: [combinedRotate, errorRotate],
  exceptionHandlers: [
    new DailyRotateFile({
      dirname: LOG_DIR,
      filename: "exceptions-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      zippedArchive: true,
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      dirname: LOG_DIR,
      filename: "rejections-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      zippedArchive: true,
    }),
  ],
});

// Pretty console output in development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        consoleFormat
      ),
    })
  );
}

export default logger;