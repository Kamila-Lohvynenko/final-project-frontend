import WaterForm from '../WaterForm/WaterForm.jsx';
import css from '../WaterModal/WaterModal.module.css';
import { OPERATION_NAME } from '../../constants';
import { MODAL_NAME } from '../../constants/index.js';

const WaterModal = ({ operation, onClose, water, setWater, chosenDate }) => {
 
  return (
    <div className={css.waterModal}>
      <h1>
        {operation === OPERATION_NAME.ADD_WATER
          ? 'Add water'
          : 'Edit the entered amount of water'}{' '}
      </h1>
      <p className={css.formHeader}>
        {operation === OPERATION_NAME.ADD_WATER
          ? 'Choose a value:'
          : 'Correct entered data:'}
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
