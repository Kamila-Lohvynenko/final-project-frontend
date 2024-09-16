import { MODAL_NAME } from '../../constants';
import css from './DeleteWaterModal.module.css'

const DeleteWaterModal = ({ onClose }) => {
  
  const handleModalClose = () => {
    onClose(MODAL_NAME.DELETE_WATER_MODAL);
  }

  return (
    <div className={css.deleteContainer}>
      <div className={css.deleteDescription}>
        <h3>Delete entry</h3>
        <p>Are you sure you want to delete the entry?</p>
      </div>
      <div className={css.deleteButtons}>
        <button className={`${css.button} ${css.deleteBtn}`} onClick={handleModalClose}>Delete</button>
        <button className={`${css.button} ${css.cancelBtn}`}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
