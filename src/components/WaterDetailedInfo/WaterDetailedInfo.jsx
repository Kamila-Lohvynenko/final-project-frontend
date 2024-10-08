import css from './WaterDetailedInfo.module.css';

import DailyInfo from './../DailyInfo/DailyInfo';
import MonthInfo from './../MonthInfo/MonthInfo';
import UserPanel from './../UserPanel/UserPanel';

const WaterDetailedInfo = ({
  setSettingsModal,
  setLogoutModal,
  openWaterModal,
  setDeleteWaterModal,
  setChosenDate,
  chosenDate,
  setWater,
}) => {
  return (
    <div className={css.wrapper}>
      <UserPanel
        setSettingsModal={setSettingsModal}
        setLogoutModal={setLogoutModal}
      />
      <DailyInfo
        openWaterModal={openWaterModal}
        setDeleteWaterModal={setDeleteWaterModal}
        chosenDate={chosenDate}
        setWater={setWater}
      />
      <MonthInfo chosenDate={chosenDate} setChosenDate={setChosenDate} />
    </div>
  );
};

export default WaterDetailedInfo;
