import { redirect } from "react-router-dom";
import { parseResponse } from "./utils";

export const getUser = () => JSON.parse(window.localStorage.getItem("user") || "null");

export const setUser = ({ email, token }) =>
  window.localStorage.setItem("user", JSON.stringify({ email, token }));

export const getToken = () => getUser()?.token;

export const protectRoute = () => {
  const user = getUser();

  if (!user) {
    throw redirect("/login");
  }

  return {};
};

export const logout = () => {
  window.localStorage.removeItem("user");
  window.location.href = "/login";
};

export const fetchAuth = (url, options: any = {}) => {
  const headers = {
    ...(options?.headers || {}),
    Authorization: `Bearer ${getToken()}`,
  };
  return fetch(url, { ...options, headers });
};

export const login = ({ email, password }: { email: string; password: string }) =>
  new Promise((resolve, reject) => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(parseResponse)
      .then(({ token }) => {
        setUser({ email, token });
        resolve(null);
      })
      .catch((error) => {
        reject(error);
      });
  });
