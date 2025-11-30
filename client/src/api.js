const API_BASE = import.meta.env.DEV
  ? "/api" // uses Vite proxy in development
  : import.meta.env.API_URL; // real backend in production

export const apiUrl = (endpoint) => `${API_BASE}${endpoint}`;
console.log(apiUrl);
