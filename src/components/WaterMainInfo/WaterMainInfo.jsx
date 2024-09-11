const WaterMainInfo = ({ openWaterModal, waterModalState }) => {
  return (
    <div>
      WaterMainInfo
      <button
        onClick={() => openWaterModal({ isOpen: true, operation: 'add' })}
      >
        open
      </button>
    </div>
  );
};

export default WaterMainInfo;
