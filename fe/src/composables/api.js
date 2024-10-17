import axios from 'axios';

const baseURL = `${import.meta.env.VITE_APP_BASE_API}/v1`;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
});

export default api;