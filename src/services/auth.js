import { authClient } from './axios.config';

// const register = (userCredentials) =>
//   authClient.post('/register', userCredentials);

// const login = (userCredentials) => authClient.post('/login', userCredentials);

// const logout = () => authClient.post('/logout');

const refresh = () => authClient.post('/refresh');

// const getUser = () => authClient.get('/data');

const update = (fieldsToUpdate) =>
  authClient.patch('/updateData', fieldsToUpdate);

const uploadAvatar = (file) =>
  authClient.patch('/updateAvatar', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export default {
  // register,
  // login,
  // logout,
  refresh,
  update,
  // getUser,
  uploadAvatar,
};
