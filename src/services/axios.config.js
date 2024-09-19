import axios from 'axios';
import { refreshError, resetToken } from '../redux/user/slice';
import { store } from '../redux/store';

import { refreshUser } from '../redux/user/operations';
// import { store } from './../redux/store';
// import { refreshError, resetToken } from '../redux/user/slice';

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + 'users',
  withCredentials: true,
});

export const waterClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + 'water',
  withCredentials: true,
});

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const accessToken = await store.dispatch(refreshUser()).unwrap();
        console.log(accessToken);

        // const { accessToken } = response.data.data;

        setAuthToken(accessToken);

        store.dispatch(resetToken(accessToken));

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        console.log('refreshError', error);
        store.dispatch(refreshError);
      }
    }
  },
);

export const setAuthToken = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  axiosInstance.defaults.headers.common['Authorization'] = ``;
};
