import axios from "axios";
import { BASE_API_URL } from "../config";
import { useAuthStore } from "../stores/authStore";

export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const auth = useAuthStore.getState();
    const token = auth.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
