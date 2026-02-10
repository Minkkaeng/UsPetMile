import axios from "axios";

// 1. Backend Integration Setup
// When the backend is ready, set VITE_API_URL in .env file
// Example: VITE_API_URL=http://localhost:8080/api
const baseURL = import.meta.env.VITE_API_URL || "/api";

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "ko",
  },
});

// 2. Interceptors for Request/Response
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors (e.g. 401 Unauthorized)
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      console.warn("Unauthorized access - redirecting to login");
    }
    return Promise.reject(error);
  },
);

export default apiClient;
