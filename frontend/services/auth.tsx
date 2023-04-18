import { redirect } from "react-router-dom";
import axios from "./axios";

export const getUser = () => JSON.parse(window.localStorage.getItem("user") || "null");

export const setUser = ({ id, email, name }) =>
  window.localStorage.setItem("user", JSON.stringify({ id, email, name }));

export const protectRoute = async () => {
  const user = getUser();

  if (!user) {
    try {
      const response = await axios.get("/api/auth/me");
      const { data } = response;
      setUser(data);
    } catch (e) {
      throw redirect("/login");
    }
  }

  return {};
};

export const logout = () =>
  axios.get("/api/auth/logout").then(() => {
    window.localStorage.removeItem("user");
    window.location.href = "/login";
  });

export const login = () => axios.post("/api/auth/login");
