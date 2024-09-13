import css from "./DailyInfo.module.css";
import ChooseDate from "../ChooseDate/ChooseDate";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";

const DailyInfo = () => {
  return (
    <div>
      <div className={css.topContainer}>
        <ChooseDate/>
        <AddWaterBtn inDetails={true} />
      </div>

    </div>
  );
};

export default DailyInfo;
