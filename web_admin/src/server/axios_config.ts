import Axios from "axios";

const axios = Axios.create({
  baseURL: "/api",
});

axios.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("TOKEN");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
