import axios from 'axios';

// Define base URL for server API (fall back to localhost:5000 in dev)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to automatically append JWT bearer tokens
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getErrorMessage = (err, defaultMessage = 'An unexpected error occurred') => {
  if (!err) return defaultMessage;

  // Extract error info from backend JSON responses
  const responseData = err.response?.data;
  if (responseData) {
    // If response contains direct error field
    if (responseData.error) {
      if (typeof responseData.error === 'string') {
        return responseData.error;
      }
      if (typeof responseData.error === 'object') {
        return responseData.error.message || responseData.error.error || JSON.stringify(responseData.error);
      }
    }
    // If response contains message field
    if (responseData.message && typeof responseData.message === 'string') {
      return responseData.message;
    }
  }

  // Fallback to Axios error message or standard error message
  return err.message || defaultMessage;
};

export default API;
