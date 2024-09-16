import WaterForm from "../WaterForm/WaterForm.jsx";
import css from '../WaterModal/WaterModal.module.css';
import {OPERATION_NAME} from '../../constants';

const WaterModal = ({operation}) => {
  return (
    <div className={css.waterModal}>
      <h1>{operation === OPERATION_NAME.ADD_WATER ? "Add water" : "Edit the entered amount of water"} </h1>
      <p className={css.formHeader}>
          {operation === OPERATION_NAME.ADD_WATER ? "Choose a value:" : "Correct entered data:"}
      </p>           
      <WaterForm />
    </div>
  );
};

export default WaterModal;





