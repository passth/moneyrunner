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
  "Content-Type": "application/json",
  "X-CSRF-Token": getCsrfToken(),
});
