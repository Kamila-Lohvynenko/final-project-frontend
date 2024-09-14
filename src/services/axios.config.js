import axios from 'axios';

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + 'users',
  withCredentials: true,
});

export const waterClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + 'water',
  withCredentials: true,
});

export const setAuthToken = (token) => {
  authClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  waterClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
