import { useState, useEffect } from 'react';
import { axiosInstance } from '../../services/axios.config';
import css from './GoogleAuth.module.css';
import { FcGoogle } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const getAuthUrl = () => axiosInstance.get('/users/get-oauth-url');

const GoogleAuth = ({ buttonText }) => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const {
        data: { data },
      } = await getAuthUrl();

      setUrl(data.url);
    }
    fetch();
  }, []);

  const handleGoogleSignIn = async (token) => {
    try {
      const { data } = await axiosInstance.post('/users/google-sign-in', { token });
      localStorage.setItem('token', data.token);
      if (!localStorage.getItem('onboardingCompleted')) {
        localStorage.setItem('onboardingCompleted', 'false'); // Если `onboardingCompleted` еще не установлено
      }
      navigate('/tracker');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        handleGoogleSignIn(event.data.token);
      }
    });

    return () => {
      window.removeEventListener('message', handleGoogleSignIn);
    };
  }, []);

  return (
    <NavLink to={url} className={css.googleBtn}>
      <FcGoogle size={24} />
      {buttonText}
    </NavLink>
  );
};

export default GoogleAuth;
