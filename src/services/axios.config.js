import axios from 'axios';

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + 'users',
});

export const waterClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + 'water',
});
