import css from './GoogleAuth.module.css';
import { FcGoogle } from 'react-icons/fc';

const GoogleAuth = ({ buttonText }) => {
  return (
    <button className={css.googleBtn}>
      <FcGoogle size={24} />
      {buttonText}
    </button>
  );
};

export default GoogleAuth;
