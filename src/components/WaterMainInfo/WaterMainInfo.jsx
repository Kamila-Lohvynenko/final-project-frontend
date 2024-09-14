import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import css from '../WaterMainInfo/WaterMainInfo.module.css';
import Logo from '../Logo/Logo.jsx';


const WaterMainInfo =({openWaterModal})=>{
 
  const handleAddWaterClick =()=>{
    openWaterModal({isOpen: true, operation: 'addWater'});
  }

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