## WiFi Tariffs Manager

A single-page application (SPA) to manage WiFi tariffs, backed by a simple express.js server that simulates a backend API using in‑memory storage.

---

## Table of Contents

- **Features**
- **Tech Stack**
- **Architecture**
- **Getting Started**
- **Environment Configuration**
- **Running the App**
- **API Overview**
- **Project Structure**
- **Deployment**

---

## Features

- **WiFi tariffs management**: Create, list, update, and delete WiFi tariffs.
- **Tabular view**: Central tariff table (see `wifiTariffs.vue` and `AppTable.vue`) with sorting capabilities.
- **In-memory backend**: express.js server with in‑memory storage to simulate API behavior.
- **Consistent API responses**: Unified response shape based on `api-response`.

## Tech Stack

- **Frontend**: Vue.js SPA (see `client/`).
- **Backend**: express.js with a lightweight HTTP server (see `server/`).
- **Language**: TypeScript on the server.

## Architecture

- **Client**:
  - Main views under `client/src/views/` (e.g. `wifiTariffs.vue`).
  - Reusable UI elements under `client/src/components/` (e.g. `AppTable.vue`).
- **Server**:
  - Core utilities in `server/src/core/` (e.g. `api-response.ts`, `storage.service.ts`).
  - WiFi tariff logic in `server/src/modules/wifi-tariffs/`.
  - Server entry point in `server/src/server.ts`.
- **Data flow**:
  - The Vue client calls REST endpoints on the server.
  - The server uses in‑memory storage to read/write tariff entries.
  - Responses are standardized using the `api-response` helpers.

## Getting Started

### Prerequisites

- **Node.js**: Recommended LTS version
- **Package manager**: NPM

### Installation

```bash
git clone https://github.com/LiSoNaZa/wifi_tariffs_manager
cd wifi_tariffs_manager

# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

## Environment Configuration

- **Client**:
  - Configure the API base URL (e.g. `VITE_API_BASE_URL`) if the frontend needs it.
- **Server**:
  - Configure server port and any other options using environment variables or a simple `.env` file (if present).

## Running the App

### Development

In one terminal, start the server and client:

```bash
npm run dev
```

Then open the development URL printed by the frontend dev server (for example `http://localhost:5173`).

## API Overview

- **Base path**: `/api/v1/wifi-tariffs` (adapt to match `wifi-tariffs.routes.ts`).
- **Example endpoints**:
  - `GET /api/v1/wifi-tariffs` – list all tariffs.
  - `POST /api/v1/wifi-tariffs` – create a new tariff.
  - `PUT /api/v1/wifi-tariffs/:id` – update an existing tariff.
  - `DELETE /api/v1/wifi-tariffs/:id` – delete a tariff.

## Project Structure

Overview:

- `client/` – Vue SPA.
  - `src/views/` – page components (`wifiTariffs.vue`).
  - `src/components/` – shared components (`AppTable.vue`, etc.).
- `server/` – express.js backend.
  - `src/core/` – shared core utilities (`api-response.ts`, `storage.service.ts`).
  - `src/modules/wifi-tariffs/` – WiFi tariffs module (routes, service, base data).
  - `src/server.ts` – server bootstrap.

## Deployment

- **Build artifacts**:
  - Client build output (e.g. `client/dist/`) can be served by any static file host.
  - Server build output (e.g. `server/dist/`) runs with Node.js.
- **Runtime requirements**:
  - Node.js on the target machine/container.
  - Environment variables configured as described above.