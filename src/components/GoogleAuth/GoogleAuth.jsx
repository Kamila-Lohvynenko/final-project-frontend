import { useState, useEffect } from 'react';
import { axiosInstance } from '../../services/axios.config';
import css from './GoogleAuth.module.css';
import { FcGoogle } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';

const getAuthUrl = () => axiosInstance.get('/users/get-oauth-url');

const GoogleAuth = ({ buttonText }) => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    async function fetch() {
      const {
        data: { data },
      } = await getAuthUrl();

      setUrl(data.url);
    }
    fetch();
  }, []);

  return (
    <NavLink to={url} className={css.googleBtn}>
      <FcGoogle size={24} />
      {buttonText}
    </NavLink>
  );
};

export default GoogleAuth;
