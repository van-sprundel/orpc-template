# Orpc + Better Auth + Tanstack Query + Zod

This is a template I made for myself so I don't have to setup the same project every time. The goal is to setup a full-stack application with end-to-end type safety. I'm also using better-auth so I don't have to set up Auth every time.

## Project Overview

This project is a monorepo with a `frontend`, `backend`, and a `shared` package, using bun as a runtime.

- **Backend:** A node HTTP server using oRPC for API communication, Prisma as the ORM for a PostgreSQL database, and `better-auth` for authentication.
- **Frontend:** A React application built with Vite, using oRPC client to communicate with the backend and TanStack Query for data fetching.
- **Shared:** A package containing shared code between the frontend and backend, including DTOs and API contracts, using Zod for validation.

## Building and Running

### Development

1.  **Start the database:**
    ```bash
    docker-compose up -d
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    ```
3.  **Run prisma migrations:**
    ```bash
    bun prisma:dev
    ```
4.  **Start the development servers:**
    ```bash
    bun dev
    ```
    This will start both the backend and frontend servers concurrently.

### Some other Commands

- **Linting:** `bun lint`
- **Formatting:** `bun format`
- **Checking:** `bun check`
