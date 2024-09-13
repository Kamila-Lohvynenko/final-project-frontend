// const WaterMainInfo = ({ openWaterModal, waterModalState }) => {
//   return (
//     <div>
//       WaterMainInfo
//       <button
//         onClick={() => openWaterModal({ isOpen: true, operation: 'add' })}
//       >
//         open
//       </button>
//     </div>
//   );
// };


import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import css from '../WaterMainInfo/WaterMainInfo.module.css';


const WaterMainInfo =()=>{
  return(
    <div>
      <div className={css.waterContainer}>             
        <WaterDailyNorma />
        <WaterProgressBar />
        <AddWaterBtn />
      </div>      
    </div>
  );
};


export default WaterMainInfo;


