// const WaterModal = ({ onClose }) => {
//   const handleClose = () => {
//     onClose("waterModal");
//   };
//   return (
//     <div>
//       WaterModal
//       <button type="button" onClick={handleClose}>
//         Close
//       </button>
//     </div>
//   );
// };

// export default WaterModal;

import WaterForm from "../WaterForm/WaterForm.jsx";

const WaterModal = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <div>      
      <WaterForm/>
      <button type="button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

export default WaterModal;
