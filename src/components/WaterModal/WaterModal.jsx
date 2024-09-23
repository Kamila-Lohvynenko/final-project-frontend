import { useTranslation } from 'react-i18next'; // Импортируем хук для перевода
import WaterForm from '../WaterForm/WaterForm.jsx';
import css from '../WaterModal/WaterModal.module.css';
import { OPERATION_NAME } from '../../constants';
import { MODAL_NAME } from '../../constants/index.js';

const WaterModal = ({ operation, onClose, water, setWater, chosenDate }) => {
  const { t } = useTranslation(); 

  return (
    <div className={css.waterModal}>
      <h1>
        {operation === OPERATION_NAME.ADD_WATER
          ? t('waterModal.addWater') 
          : t('waterModal.editWater')}{' '}
      </h1>
      <p className={css.formHeader}>
        {operation === OPERATION_NAME.ADD_WATER
          ? t('waterModal.chooseValue') 
          : t('waterModal.correctData')} 
      </p>
      <WaterForm
        chosenDate={chosenDate}
        onClose={() => onClose(MODAL_NAME.WATER_MODAL)}
        water={water}
        setWater={setWater}
        operation={operation}
      />
    </div>
  );
};

export default WaterModal;
