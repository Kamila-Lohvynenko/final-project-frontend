import axios from 'axios';
import { store } from './../redux/store';
import { refreshError, resetToken } from '../redux/user/slice';
import { refreshUser } from '../redux/user/operations';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const response = await axiosInstance.post('users/refresh');
//         console.log(response);

//         const { accessToken } = response.data.data;

//         console.log(accessToken);

//         setAuthToken(accessToken);

//         store.dispatch(resetToken(accessToken));

//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (error) {
//         console.log('refreshError', error);
//         store.dispatch(refreshError());
//       }
//     }
//   },
// );
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
        store.dispatch(refreshError());
      }
    }
    if (
      error.response.status == 409 ||
      error.response.status == 404 ||
      error.response.status == 400 ||
      error.response.status == 500
    ) {
      return Promise.reject(error);
    }
  },
);

export const setAuthToken = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  axiosInstance.defaults.headers.common['Authorization'] = ``;
};
