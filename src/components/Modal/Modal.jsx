import css from './Modal.module.css';
import ReactModal from 'react-modal';

import sprite from '../../images/sprite.svg';

const Modal = ({ children, isOpen, setState }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName={css.overlay}
      className={css.modal}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => setState(false)}
      ariaHideApp={false}
      onAfterOpen={() => (document.body.style.overflow = 'hidden')}
      onAfterClose={() => (document.body.style.overflow = 'unset')}
    >
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={() => setState(false)}>
          <svg className={css.icon}>
            <use href={`${sprite}#icon-x`} />
          </svg>
        </button>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
