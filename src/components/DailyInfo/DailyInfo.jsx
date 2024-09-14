import css from "./DailyInfo.module.css";
import ChooseDate from "../ChooseDate/ChooseDate";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterList from "../WaterList/WaterList";

const DailyInfo = () => {
  return (
    <div>
      <div className={css.topContainer}>
        <ChooseDate/>
        <AddWaterBtn inDetails={true} />
      </div>
      <div>
        <WaterList/>
      </div>

    </div>
  );
};

export default DailyInfo;
