import { useDispatch } from 'react-redux';
import { MODAL_NAME } from '../../constants';
import css from './DeleteWaterModal.module.css'
import { deleteWater } from '../../redux/water/operations';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const DeleteWaterModal = ({ onClose, water, setWater }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const handleModalClose = () => {
    onClose(MODAL_NAME.DELETE_WATER_MODAL);
  }

  const handleOnDelete = () => {
    dispatch(deleteWater(water))
      .unwrap()
      .then(() => {
        setWater(null);
        toast.success(t('modal.success'));
      })
      .catch(() => {
        toast.error(t('modal.error'));
       
      })
      .finally(() => { onClose(MODAL_NAME.DELETE_WATER_MODAL); });
  }

  return (
    <div className={css.deleteContainer}>
      <div className={css.deleteDescription}>
        <h3>{t('modal.delete_entry')}</h3>
        <p>{t('modal.delete_confirmation')}</p>
      </div>
      <div className={css.deleteButtons}>
        <button className={`${css.button} ${css.deleteBtn}`} onClick={handleOnDelete}>{t('modal.delete')}</button>
        <button className={`${css.button} ${css.cancelBtn}`} onClick={handleModalClose}>{t('modal.cancel')}</button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
