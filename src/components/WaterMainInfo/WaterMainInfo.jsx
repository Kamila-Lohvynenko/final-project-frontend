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

// import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
// import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
// import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
// import css from '../WaterMainInfo/WaterMainInfo.module.css';
// import { useState } from 'react';
// import WaterModal from '../WaterModal/WaterModal.jsx';
// import Modal from '../Modal/Modal.jsx';


// const WaterMainInfo =()=>{
//   const [isWaterModalOpen, setIsWaterModalOpen]=useState(false);

//   const handleAddWaterClick =()=>{
//     setIsWaterModalOpen(true);
//   }

//   const handleCloseModal=()=>{
//     setIsWaterModalOpen(false);
//   }

//   return(
//     <div>
//       <div className={css.waterContainer}>             
//         <WaterDailyNorma />
//         <WaterProgressBar />
//         <AddWaterBtn onClick={handleAddWaterClick} />
//       </div>
//       <Modal isOpen={isWaterModalOpen} setState={setIsWaterModalOpen}>  
//         <WaterModal onClose={handleCloseModal}/>
//       </Modal>
//     </div>
//   );
// };


// export default WaterMainInfo;

import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import css from '../WaterMainInfo/WaterMainInfo.module.css';


const WaterMainInfo =({openWaterModal})=>{
 
  const handleAddWaterClick =()=>{
    openWaterModal({isOpen: true, operation: 'addWater'});
  }

  return(
    <div>
      <div className={css.waterContainer}>             
        <WaterDailyNorma />
        <WaterProgressBar />
        <AddWaterBtn onClick={handleAddWaterClick} />
      </div>      
    </div>
  );
};


export default WaterMainInfo;