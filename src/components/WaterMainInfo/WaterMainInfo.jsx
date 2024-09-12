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

import Logo from '../Logo/Logo.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import css from '../WaterMainInfo/WaterMainInfo.module.css';


const WaterMainInfo =()=>{
  return(
    <div className={css.waterContainer}>
      <Logo />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  )
};

export default WaterMainInfo;
