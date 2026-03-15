# NASA Data Application

This repository contains a full-stack application for exploring NASA data, including a backend (Node.js/Express) and a frontend (React/Vite).

---

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Project Scripts](#project-scripts)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Project Structure

```
backend/    # Node.js/Express API server
frontend/   # React/Vite client application
```

---

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Setup Instructions

### Backend
1. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and update values as needed.
   - **NASA API Key:**
     - Obtain a free NASA API key from [https://api.nasa.gov/](https://api.nasa.gov/).
     - Set the `NASA_API_KEY` variable in your `.env` file.
     - You can use `DEMO_KEY` as a temporary key, but it has strict rate limits.

### Frontend
1. **Navigate to the frontend directory:**
   ```sh
   cd frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and update values as needed (if applicable).

---

## Running the Application

### Start Backend
From the `backend` directory:
```sh
npm run dev
```
- The backend server will start (default: `http://localhost:4000`).

### Start Frontend
From the `frontend` directory:
```sh
npm run dev
```
- The frontend app will start (default: `http://localhost:5173`).

### Accessing the App
- Open your browser and go to `http://localhost:5173`.
- The frontend will communicate with the backend API.

---

## API Documentation
- The backend provides Swagger/OpenAPI documentation.
- Once the backend is running, visit: `http://localhost:4000/api/docs`

---

## Environment Variables
- Both backend and frontend may require environment variables for configuration.
- See `.env.example` in each directory for required variables.

---

## Testing

### Backend
From the `backend` directory:
```sh
npm test
```
---

## Project Scripts

### Backend (`backend/package.json`)
- `npm run dev` — Start the backend in development mode
- `npm test` — Run backend tests

### Frontend (`frontend/package.json`)
- `npm run dev` — Start the frontend in development mode
- `npm run build` — Build the frontend for production
- `npm run preview` — Preview the production build

---

## Troubleshooting
- Ensure both backend and frontend are running on their respective ports.
- If ports are in use, update the port in the `.env` files.
- Check the console for errors and ensure all dependencies are installed.

---
