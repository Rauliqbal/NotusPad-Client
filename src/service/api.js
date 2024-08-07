import axios from "axios";

// const url = "https://notus-pad-server.vercel.app/api";
// DEVELOPMENT
const url = "https://notus-pad-server.vercel.app/api";
export const api = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
