import { logout } from "./auth";

export const parseResponse = (res) =>
  new Promise((resolve, reject) => {
    if (!res.ok && res.status === 401) {
      logout();
    }

    if (!res.ok) {
      return res.json().then((data) => reject({ status: res.status, data }));
    }

    return res.json().then((data) => resolve(data));
  });

export const getCookie = (name) => {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie
    .split(";")
    .map((c) => c.trim())
    .filter((c) => c.startsWith(`${name}=`));

  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split("=")[1]);
};

export const getCsrfToken = () => getCookie("_csrf");

export const getHeaders = () => ({
  "X-CSRF-Token": getCsrfToken(),
});
