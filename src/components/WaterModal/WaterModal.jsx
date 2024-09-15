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

// import WaterForm from "../WaterForm/WaterForm.jsx";
// import css from '../WaterModal/WaterModal.module.css';
// import {OPERATION_NAME} from '../../constants';
// import { useDispatch } from "react-redux";
// import {addWater, updateWater} from '../../redux/water/operations.js';


// const WaterModal = ({
//   operationType = OPERATION_NAME.ADD_WATER,
//   onClose,
//   defaultValues = {time: '07:00', amound: 250}
// }) => {
//   const dispatch = useDispatch();

//   const handleSubmit = (data) =>{
//     const {amound, time} = data;
//     if (operationType === OPERATION_NAME.ADD_WATER){
//       dispatch (addWater({time, volume: amound.toString()}));      
//     }else if(operationType === OPERATION_NAME.EDIT_WATER){
//       dispatch(updateWater({time, volume: amound.toString()}));
//     }
//     onClose();
//   }

//   return (
//     <div className={css.waterModal}>
//       <h1>{operationType === OPERATION_NAME.ADD_WATER ? "Add water" : "Edit the entered amount of water"} </h1>           
//       <WaterForm onSubmit={handleSubmit}
//       defaultValues={defaultValues}
//       onClose={onClose}
//       />
//     </div>
//   );
// };

// export default WaterModal;




