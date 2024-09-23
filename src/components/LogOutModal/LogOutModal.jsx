import { useDispatch } from 'react-redux';
import css from './LogOutModal.module.css';
import { logoutUser } from '../../redux/user/operations';
import { MODAL_NAME } from '../../constants';
import { useTranslation } from 'react-i18next';

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logoutUser());
    onClose(MODAL_NAME.LOGOUT_MODAL);
    localStorage.clear();
  };

  const handleCloseModal = () => {
    onClose(MODAL_NAME.LOGOUT_MODAL);
  };

  return (
    <div className={css.logout_wrap}>
      <div className={css.logout_texts__block}>
        <h3>{t('logout.title')}</h3>
        <p>{t('logout.message')}</p>
      </div>
      <div className={css.buttons_block}>
        <button
          className={`${css.button} ${css.btn_logout}`}
          onClick={handleLogout}
        >
          {t('logout.buttonLogout')}
        </button>
        <button
          className={`${css.button} ${css.btn_cancel}`}
          onClick={handleCloseModal}
        >
          {t('logout.buttonCancel')}
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
