const API_BASE = import.meta.env.DEV
  ? "" // uses Vite proxy in development
  : import.meta.env.VITE_API_URL; // real backend in production

export const apiUrl = (endpoint) => `${API_BASE}${endpoint}`;
