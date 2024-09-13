import css from './WaterDetailedInfo.module.css';

import DailyInfo from './../DailyInfo/DailyInfo';
import MonthInfo from './../MonthInfo/MonthInfo';
import UserPanel from './../UserPanel/UserPanel';

const WaterDetailedInfo = ({
  setSettingsModal,
  setLogoutModal,
  openWaterModal,
  setDeleteWaterModal,
}) => {
  return (
    <div className={css.wrapper}>
      WaterDetailedInfo
      <UserPanel
        setSettingsModal={setSettingsModal}
        setLogoutModal={setLogoutModal}
      />
      <DailyInfo
        openWaterModal={openWaterModal}
        setDeleteWaterModal={setDeleteWaterModal}
      />
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
