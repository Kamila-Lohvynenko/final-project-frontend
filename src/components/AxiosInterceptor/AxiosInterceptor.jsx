import { useDispatch } from 'react-redux';
import { axiosInstance, setAuthToken } from '../../services/axios.config';
import { refreshError, resetToken } from '../../redux/user/slice';
// import { useEffect } from 'react';

export function AxiosInterceptor() {
  const dispatch = useDispatch();
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      console.log(originalRequest);

      if (
        error.response.status === 401 &&
        originalRequest._retry === undefined
      ) {
        originalRequest._retry = true;
        try {
          const response = await axiosInstance.post('/users/refresh');
          console.log(response);
          const { accessToken } = response.data.data;

          console.log(accessToken);

          setAuthToken(accessToken);

          dispatch(resetToken(accessToken));

          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return await axiosInstance(originalRequest);
        } catch (error) {
          console.log('refreshError', error);
          dispatch(refreshError());

          return Promise.reject();
        }
      }
      return Promise.reject(error);
    },
  );
  return null;
}

// export function AxiosInterceptor() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     axiosInstance.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//           originalRequest._retry = true;
//           try {
//             const response = await axiosInstance.post('/auth/refresh');

//             const { accessToken } = response.data.data;
//             console.log(accessToken);

//             setAuthToken(accessToken);

//             dispatch(resetToken(accessToken));
//             console.log('originalRequest', originalRequest);
//             originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//             return await axiosInstance(originalRequest);
//           } catch (refreshErr) {
//             dispatch(refreshError());
//             return Promise.reject(refreshErr);
//           }
//         }

//         return Promise.reject(error);
//       },
//     );
//   }, [dispatch]);

//   return null;
// }
