import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// Attach JWT automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Global 401 handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    // Only redirect if it's NOT the login request
    if (status === 401 && !originalRequest.url.includes("/api/auth/login")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
