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
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };

    if (body && method !== "GET" && method !== "HEAD") {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(actualUrl, options);

      // Try parsing JSON (may fail for 204 or empty error responses)
      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      // Handle unauthorized
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return null;
      }

      // Error case
      if (!response.ok) {
        const message =
          data?.error || data?.message || `HTTP Error ${response.status}`;
        setError(message);
        throw new Error(message);
      }

      // Success
      return data;
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, executeFetch };
};
