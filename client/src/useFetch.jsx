import { useState, useCallback } from "react";
import { apiUrl } from "./api";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async (url, method = "GET", body = null) => {
    const token = localStorage.getItem("token");
    const actualUrl = apiUrl(url);

    setLoading(true);
    setError(null);

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    if (body && method !== "GET" && method !== "HEAD") {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(actualUrl, options);

      // Try to read JSON, but safely
      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        // Handle expired tokens
        if (response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/";
          return null;
        }

        const message =
          data?.message || `HTTP error! status: ${response.status}`;

        throw new Error(message);
      }

      return data;
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "An unknown error occurred.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, executeFetch };
};
