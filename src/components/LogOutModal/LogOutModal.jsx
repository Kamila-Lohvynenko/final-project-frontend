import css from './LogOutModal.module.css';

const LogOutModal = () => {
  return (
    <div className={css.logout_wrap}>
      <div className={css.logout_texts__block}>
        <h3>Log out</h3>
        <p>Do you really want to leave?</p>
      </div>
      <div className={css.buttons_block}>
        <button className={`${css.button} ${css.btn_logout}`}>Log out</button>
        <button className={`${css.button} ${css.btn_cancel}`}>Cancel</button>
      </div>
    </div>
  );
};

export default LogOutModal;
