import WaterForm from "../WaterForm/WaterForm.jsx";
import css from '../WaterModal/WaterModal.module.css';

const WaterModal = () => {
  return (
    <div className={css.waterModal}>
      <h1>Add water</h1>      
      <WaterForm/>
    </div>
  );
};

export default WaterModal;