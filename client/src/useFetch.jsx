import { useState, useCallback } from "react";

export const useFetch = () => {
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async (url, method = "GET", body = null) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
        
      },
    };

    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

     if (body && method !== "GET" && method !== "HEAD") {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
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
