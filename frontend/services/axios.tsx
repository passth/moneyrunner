import axios from "axios";
import { getHeaders } from "./utils";

const instance = axios.create({
  withCredentials: true,
  headers: getHeaders(),
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error?.response;

    if (response?.status === 401) {
      window.localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
