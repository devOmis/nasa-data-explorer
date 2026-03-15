src/

# NASA Data Frontend

This is the frontend application for the NASA Data project. It is built with React, TypeScript, and Vite, and provides a modern, responsive UI for exploring NASA's public APIs, including Astronomy Picture of the Day (APOD) and Near Earth Objects (NEO).

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Routing](#routing)
- [UI Components](#ui-components)
- [API Services](#api-services)
- [Development Notes](#development-notes)
- [License](#license)

## Features
- 🚀 Modern React (with hooks and functional components)
- ⚡ Fast build and hot reload with Vite
- 🎨 Custom UI components and layouts
- 🌌 APOD and NEO data display
- 🧩 Modular code structure
- 🧪 TypeScript for type safety
- ✨ Animations with Framer Motion

## Project Structure
```
frontend/
  public/                # Static assets
  src/
    assets/              # Images and static files
    common/
      components/        # Reusable components (error, loader, layouts, ui)
    config/              # App configuration (env, routes)
    hooks/               # Custom React hooks
    lib/                 # Utility functions
    pages/               # Page components (Home, NotFound, apod, neo)
    services/            # API service modules
    index.css            # Global styles
    main.tsx             # App entry point
    App.tsx              # Root component
  package.json           # Project metadata and scripts
  vite.config.ts         # Vite configuration
  tsconfig*.json         # TypeScript configuration
  README.md              # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App
Start the development server:
```sh
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Building for Production
```sh
npm run build
```
The production-ready files will be in the `dist/` directory.

### Preview Production Build
```sh
npm run preview
```

## Available Scripts
- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint on the codebase

## Environment Variables
Environment variables are managed in `src/config/env.ts`. You can add a `.env` file in the `frontend` directory for local overrides. Common variables:
- `VITE_API_BASE_URL` — Base URL for the backend API

## Routing
Routes are defined in `src/config/routes.json` and implemented using React Router in `src/main.tsx` and `src/pages/`.

## UI Components
Reusable UI components are located in `src/common/components/ui/` (e.g., `button.tsx`, `card.tsx`, `input.tsx`). Layouts are in `src/common/components/layouts/`.

## API Services
API calls are managed in `src/services/nasa.ts` using Axios or Fetch. Update this file to add new endpoints or modify existing ones.