import { useState, useCallback } from "react";
import { apiUrl } from "./api";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async (url, method = "GET", body = null) => {
    const actualUrl = apiUrl(url);
    setLoading(true);
    setError(null);

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    };

    try {
      const response = await fetch(actualUrl, options);
      const data = await response.json();
      if (!response.ok) {
        // Use backend message if available
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
