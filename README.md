# Foodio — Frontend

Foodio is a Next.js frontend for a food ordering application. This repository contains the React/Next app used by customers and admins to browse the menu, manage categories and menu items, and place orders.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Setup](#quick-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Development Notes](#development-notes)
- [Folder Structure](#folder-structure)
- [Deploying](#deploying)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This is the frontend application for Foodio, built with Next.js and TypeScript. It implements public pages for browsing the menu and creating orders, plus an admin area for managing categories, menu items and orders.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Zod (runtime validation)
- Axios (HTTP client)

## Prerequisites

- Node.js (v18+ recommended)
- A package manager: `npm`, `pnpm`, or `yarn`

## Quick Setup

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/sszobaer/foodio-frontend.git
cd foodio-frontend
npm install
# or `pnpm install` / `yarn install`
```

2. Create environment variables (see below) and start the dev server:

```bash
npm run dev
# or `pnpm dev` / `yarn dev`
```

Open http://localhost:3000 to view the app.

## Environment Variables

Create a `.env.local` file in the project root for local development. Common variables used by this frontend include:

- `NEXT_PUBLIC_API_URL` — base URL of the backend API (e.g. `http://localhost:4000`)

Add any additional variables used by your deployed backend or CI.

## Available Scripts

The npm scripts available in `package.json` are:

- `dev` — runs the Next.js development server
- `build` — builds the production application
- `start` — runs the production server after build

Run them with `npm run <script>` (or the equivalent with `pnpm`/`yarn`).

## Development Notes

- API client is implemented at [src/lib/api-client.ts](src/lib/api-client.ts).
- Server-side helpers and auth utilities are in [src/lib/api-server.ts](src/lib/api-server.ts) and [src/lib/server-auth.ts](src/lib/server-auth.ts).
- Services (business logic wrappers around API calls) live in [src/services](src/services).
- Validation schemas are defined under [src/schemas](src/schemas).

If you're working on the admin UI, the admin area lives under [src/app/(admin)](src/app/(admin)) and related components under [src/components/features/admin](src/components/features/admin).

## Folder Structure

Top-level important folders/files:

- [src/app](src/app) — Next.js app routes and layouts
- [src/components](src/components) — UI components organized by feature
- [src/lib](src/lib) — API clients and server helpers
- [src/services](src/services) — thin services used by pages/components
- [src/schemas](src/schemas) — Zod schemas and validation
- [src/context](src/context) — React providers (Auth, Cart)

## Deploying

This app can be deployed to Vercel, Netlify, or any platform that supports Next.js. Typical steps for Vercel:

1. Connect the GitHub repository to Vercel.
2. Set the required environment variables (`NEXT_PUBLIC_API_URL`, etc.) in the Vercel project settings.
3. Vercel will automatically build and deploy the app on push to the configured branch.

For self-hosting:

```bash
npm run build
npm run start
```

## Contributing

Contributions are welcome. Please open issues or pull requests with a clear description of changes. If you add new environment variables, update this README with the required keys and example values.
