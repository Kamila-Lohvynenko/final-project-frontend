import WaterForm from "../WaterForm/WaterForm.jsx";
import css from '../WaterModal/WaterModal.module.css';
import {OPERATION_NAME} from '../../constants';

const WaterModal = ({operationType = OPERATION_NAME.ADD_WATER}) => {
  return (
    <div className={css.waterModal}>
      <h1>{operationType === OPERATION_NAME.ADD_WATER ? "Add water" : "Edit the entered amount of water"} </h1>           
      <WaterForm/>
    </div>
  );
};

export default WaterModal;





