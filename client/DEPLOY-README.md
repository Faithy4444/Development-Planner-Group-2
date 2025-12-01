# API Fetching Guide (Development & Production)

This document explains how our frontend talks to the backend using:
- useFetch
- apiUrl()
- Vite proxy (development)
- Environment variables (production)

This setup keeps our API calls simple and prevents broken URLs during deployment.

### api.js
```
const API_BASE = import.meta.env.DEV
  ? "" // uses Vite proxy in development
  : import.meta.env.VITE_API_URL; // real backend in production

export const apiUrl = (endpoint) => `${API_BASE}${endpoint}`;

```

## How it Works in Development (Local Machine)

### ✔ Development Mode (`npm run dev`)

In dev, Vite sets:

`import.meta.env.DEV === true`

So:

`API_BASE = ""`

This means your request:

`executeFetch("/api/goals")`

gets converted into:

`fetch("/api/goals")`

Then **Vite's proxy** takes over:

### `vite.config.js`
```
server: {
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
    },
  },
}
```
So the request gets forwarded to:

`http://localhost:3000/api/goals`

## How it Works in Production (Deployed App)

### ✔ Build Mode (`npm build`)

When deployed (build mode), Vite sets:

`import.meta.env.DEV === false`

So now:

`API_BASE = import.meta.env.VITE_API_URL`

I set this variable on Coolify:

`VITE_API_URL=https://your-backend-domain.com`

Then:

`executeFetch("/api/goals")`

becomes:

`fetch("https://planyourfuture-backend.hosting.codeyourfuture.io/api/goals")`
