import { useDispatch } from 'react-redux';
import { axiosInstance, setAuthToken } from '../../services/axios.config';
import { refreshError, resetToken } from '../../redux/user/slice';

export function AxiosInterceptor() {
  const dispatch = useDispatch();
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
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
