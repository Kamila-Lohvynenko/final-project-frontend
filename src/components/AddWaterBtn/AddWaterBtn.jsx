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

import css from '../AddWaterBtn/AddWaterBtn.module.css';

const AddWaterBtn =()=>{
    return(
        <button type="button" className={css.btnAdd}>Add water</button>
    )
};

export default AddWaterBtn;