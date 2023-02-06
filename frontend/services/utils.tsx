import { logout } from './auth';

export const parseResponse = (res) => {
  return new Promise((resolve, reject) => {
    if (!res.ok && res.status === 401) {
      logout();
    }

    if (!res.ok) {
      return res.json().then((data) => reject({ status: res.status, data }));
    }

    return res.json().then((data) => resolve(data));
  });
};
