import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import Logo from '../Logo/Logo.jsx';
import { OPERATION_NAME } from '../../constants/index.js';
import css from '../WaterMainInfo/WaterMainInfo.module.css';

const WaterMainInfo =({openWaterModal})=>{ 
  const handleAddWaterClick = () => {
    openWaterModal({ isOpen: true, operation: OPERATION_NAME.ADD_WATER });
  };

  return(
    <div>
      <div className={css.waterContainer}>
        <Logo className={css.waterTitle} />             
        <WaterDailyNorma />
        <WaterProgressBar />
        <AddWaterBtn onClick={handleAddWaterClick} />
      </div>      
    </div>
  );
};

export default WaterMainInfo;