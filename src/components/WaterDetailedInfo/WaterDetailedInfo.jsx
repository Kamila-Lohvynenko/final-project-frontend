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
    <div>
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
