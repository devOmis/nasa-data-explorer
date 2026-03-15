# NASA Data Explorer Backend

## Overview
This backend is an API server for the NASA Data Explorer project. It provides endpoints to fetch NASA datasets (such as Astronomy Picture of the Day and Near-Earth Object feeds), health checks, and serves OpenAPI (Swagger) documentation. The backend is built with Express and TypeScript, featuring robust error handling, request logging, and environment-based configuration.

---

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Setup & Installation](#setup--installation)
- [Running the Server](#running-the-server)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Error Handling & Middleware](#error-handling--middleware)
- [Configuration](#configuration)
- [Dependencies & Conventions](#dependencies--conventions)
- [Contributing & Linting](#contributing--linting)
- [License & Credits](#license--credits)

---

## Architecture

**Folder Structure:**

```
src/
	app.ts, server.ts         # App/server bootstrap
	routes/
		health/                 # Health check endpoint
		v1/nasa/                # NASA data endpoints, controllers, services, types, schemas, docs
	middlewares/              # Error handling, logging, validation, request context
	config/                   # Environment, logger, CORS, Swagger, general config
	common/                   # Shared utilities and error classes
```

**Key Modules:**
- Express app with modular routers
- Controllers/Services for NASA and health endpoints
- Middleware for error handling, logging, validation, and request context
- Config for environment, logging, and API docs

---

## Setup & Installation

**Prerequisites:**
- Node.js (LTS recommended)
- npm

**Install dependencies:**
```sh
cd backend
npm install
```

---

## Running the Server

**Development:**
```sh
npm run dev
```

**Build:**
```sh
npm run build
```

**Start (production):**
```sh
npm start
```

---

## Testing

**Run tests:**
```sh
npm test
```
- Uses Jest and Supertest for integration tests.

---

## API Documentation

- **Swagger UI:** [http://localhost:PORT/api-docs](http://localhost:PORT/api-docs)
- **Health:** `GET /health`
- **NASA API:**
	- `GET /api/v1/nasa/apod?date=YYYY-MM-DD` — Astronomy Picture of the Day
	- `GET /api/v1/nasa/neo?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` — Near-Earth Object feed

See Swagger UI for detailed request/response schemas and try out endpoints interactively.

---

## Error Handling & Middleware

- **Custom Errors:** Centralized error classes (`AppError`, HTTP error subclasses)
- **Error Handler:** Logs unexpected errors, returns structured JSON
- **Not Found Handler:** Returns 404 for unknown routes
- **Validation:** Zod schemas for request validation
- **Request Context:** Unique request ID per request
- **Request Logging:** Winston logger with daily rotation

---

## Configuration

Environment variables are managed in `.env` and validated with Zod. Key variables:

- `PORT` — Server port
- `NODE_ENV` — Environment (development, production, etc.)
- `CORS_ORIGIN` — Allowed CORS origins
- `NASA_API_KEY` — NASA API key
- `NASA_BASE_URL` — NASA API base URL
- `NASA_TIMEOUT_MS` — NASA API request timeout
- `CACHE_TTL_MS` — Cache time-to-live
- `CACHE_MAX_ENTRIES` — Cache size
- `SHUTDOWN_TIMEOUT_MS` — Graceful shutdown timeout

See `src/config/env.ts` and `src/config/index.ts` for details.

---

## Dependencies & Conventions

- **Express 5**, **TypeScript**, **ES modules**
- **Zod** for schema validation
- **Winston** for logging (with daily rotate)
- **Swagger-jsdoc** and **swagger-ui-express** for API docs
- **Jest** and **Supertest** for testing
- **Husky** and **lint-staged** for pre-commit hooks
- **Biome** for linting/formatting

**Conventions:**
- Modular, layered architecture (routes/controllers/services)
- Strong typing and validation
- Centralized error and request handling
- Environment-driven configuration
