import { redirect } from "react-router-dom";
import { parseResponse, getHeaders } from "./utils";

export const getUser = () => JSON.parse(window.localStorage.getItem("user") || "null");

export const setUser = ({ id, email, name }) =>
  window.localStorage.setItem("user", JSON.stringify({ id, email, name }));

export const protectRoute = async () => {
  const user = getUser();

  if (!user) {
    try {
      const response = await fetch("/api/auth/me");
      const data: any = await parseResponse(response);
      setUser(data);
    } catch (e) {
      throw redirect("/login");
    }
  }

  return {};
};

export const logout = () =>
  fetch("/api/auth/logout").then(() => {
    window.localStorage.removeItem("user");
    window.location.href = "/login";
  });

export const login = () =>
  new Promise((resolve, reject) => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: getHeaders(),
    })
      .then(parseResponse)
      .then(resolve)
      .catch((error) => {
        reject(error);
      });
  });
