import Axios from "axios";
import { LOCAL_VARIABLE } from "@/constant";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem(LOCAL_VARIABLE.USER_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response: any) => {
    return response?.data || response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
