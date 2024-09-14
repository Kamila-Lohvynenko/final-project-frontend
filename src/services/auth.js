import { authClient } from './axios.config';

const register = (userCredentials) =>
  authClient.post('/register', userCredentials);

const login = (userCredentials) => authClient.post('/login', userCredentials);

const logout = () => authClient.logout('/logout');

const refresh = () => authClient.get('/refresh-user');

// TODO update route name
const update = (fieldsToUpdate) =>
  authClient.patch('/update-user', fieldsToUpdate);

export default { register, login, logout, refresh, update };
