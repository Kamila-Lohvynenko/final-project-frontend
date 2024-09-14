import css from "./DailyInfo.module.css";
import ChooseDate from "../ChooseDate/ChooseDate";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";
import { OPERATION_NAME } from "../../constants";

const DailyInfo = ({ openWaterModal, setDeleteWaterModal }) => {
  
  const handleAddWaterClick = () => {
    openWaterModal({isOpen: true, operation: OPERATION_NAME.ADD_WATER});
  }

  const handleEditWaterClick = () => {
    openWaterModal({isOpen: true, operation: OPERATION_NAME.EDIT_WATER});
  }

  const handleDeleteWaterClick = () => {
    setDeleteWaterModal(true);
  }
  
  return (
    <div>
      <div className={css.topContainer}>
        <ChooseDate/>
        <AddWaterBtn inDetails={true} onClick={handleAddWaterClick}/>
      </div>
      <div>
        <WaterList openWaterModal={handleEditWaterClick} setDeleteWaterModal={handleDeleteWaterClick} />
      </div>

    </div>
  );
};

export default DailyInfo;
