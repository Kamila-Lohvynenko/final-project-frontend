const WaterModal = ({ onClose }) => {
  const handleClose = () => {
    onClose("waterModal");
  };
  return (
    <div>
      WaterModal
      <button type="button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

export default WaterModal;
