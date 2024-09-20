import { useDispatch } from 'react-redux';
import { MODAL_NAME } from '../../constants';
import css from './DeleteWaterModal.module.css'
import { deleteWater } from '../../redux/water/operations';

const DeleteWaterModal = ({ onClose, water, setWater }) => {

  const dispatch = useDispatch();
  
  const handleModalClose = () => {
    onClose(MODAL_NAME.DELETE_WATER_MODAL);
  }

  const handleOnDelete = () => {
    dispatch(deleteWater(water)).unwrap();
    onClose(MODAL_NAME.DELETE_WATER_MODAL);
    setWater(null);
  }

  return (
    <div className={css.deleteContainer}>
      <div className={css.deleteDescription}>
        <h3>Delete entry</h3>
        <p>Are you sure you want to delete the entry?</p>
      </div>
      <div className={css.deleteButtons}>
        <button className={`${css.button} ${css.deleteBtn}`} onClick={handleOnDelete}>Delete</button>
        <button className={`${css.button} ${css.cancelBtn}`} onClick={handleModalClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
