import { useDispatch } from 'react-redux';
import css from './LogOutModal.module.css';
import { logoutUser } from '../../redux/user/operations';
import { useNavigate } from 'react-router-dom';

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    onClose('logoutModal');
    navigate('/');
  };

  const handleCloseModal = () => {
    onClose('logoutModal');
  };

  return (
    <div className={css.logout_wrap}>
      <div className={css.logout_texts__block}>
        <h3>Log out</h3>
        <p>Do you really want to leave?</p>
      </div>
      <div className={css.buttons_block}>
        <button
          className={`${css.button} ${css.btn_logout}`}
          onClick={handleLogout}
        >
          Log out
        </button>
        <button
          className={`${css.button} ${css.btn_cancel}`}
          onClick={handleCloseModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
