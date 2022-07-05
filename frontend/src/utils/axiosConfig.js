import axios from "axios";

const instance = axios.create({});

instance.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    console.log(localStorage.getItem("accessToken"));
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
