# Travel App

A responsive travel application built with React and TypeScript. The app lets users explore countries around the world and discover information about each country.

## Live Demo

[Visit the Travel App](https://YOUR_GITHUB_USERNAME.github.io/fe25-js3-reseapp-Mohammed-AbouAlpha/)

## Features

- Browse countries from around the world.
- Search for countries by name.
- Filter countries by region.
- Navigate through countries using pagination.
- View detailed information about a selected country.
- See country flags, capitals and regions.
- Check current weather information.
- Read introductory information about countries from Wikipedia.
- View images related to countries.
- Responsive layout for different screen sizes.

## Technologies

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Context
- React Hook Form
- Zod
- REST APIs

## APIs

The application uses external APIs to retrieve country information, weather data and additional information about each country.

- **REST Countries API** – country names, flags, capitals and regions.
- **Weather API** – current weather information.
- **Wikipedia API** – introductory text and images.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Navigate to the project folder:

   ```bash
   cd YOUR_PROJECT_FOLDER
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal.

## Available Scripts

- `npm run dev` – starts the development server.
- `npm run build` – builds the application for production.
- `npm run lint` – checks the code for linting issues, if configured.
- `npm run preview` – previews the production build locally.

## Project Structure

```text
src/
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Application pages
├── types/         # TypeScript types
├── App.tsx        # Main application and routing
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## Purpose

This project was created as part of a frontend development assignment. The goal is to practise using React, TypeScript, APIs, routing, data fetching and reusable components while building a responsive travel application.

## Author

Mohammed Abou Alpha
