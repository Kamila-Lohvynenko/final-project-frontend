import WaterForm from "../WaterForm/WaterForm.jsx";
import css from '../WaterModal/WaterModal.module.css';
import {OPERATION_NAME} from '../../constants';
import { useEffect, useState } from "react";
import { MODAL_NAME } from '../../constants/index.js';

const WaterModal = ({operation, onClose}) => {
  const [chosenDate, setChosenDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });

  useEffect(() => {
    const now = new Date();
    setChosenDate({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    });
  }, []);

  return (
    <div className={css.waterModal}>
      <h1>{operation === OPERATION_NAME.ADD_WATER ? "Add water" : "Edit the entered amount of water"} </h1>
      <p className={css.formHeader}>
          {operation === OPERATION_NAME.ADD_WATER ? "Choose a value:" : "Correct entered data:"}
      </p>           
      <WaterForm chosenDate={chosenDate} onClose={() => onClose(MODAL_NAME.WATER_MODAL)} />
    </div>
  );
};

export default WaterModal;





