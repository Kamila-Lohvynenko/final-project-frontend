import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import Logo from '../Logo/Logo.jsx';
import { OPERATION_NAME } from '../../constants/index.js';
import css from '../WaterMainInfo/WaterMainInfo.module.css';
import ChangeLanguageBtn from '../ChangeLanguageBtn/ChangeLanguageBtn';

const WaterMainInfo = ({ openWaterModal, chosenDate }) => {
  const handleAddWaterClick = () => {
    openWaterModal({ isOpen: true, operation: OPERATION_NAME.ADD_WATER });
  };

  return (
    <div>
      <div className={css.waterContainer}>
        <div className={css.logo_language__block}>
          <Logo />
          <ChangeLanguageBtn activeClassName={css.activeBtn} />
        </div>

        <WaterDailyNorma />
        <WaterProgressBar chosenDate={chosenDate} />
        <AddWaterBtn onClick={handleAddWaterClick} />
      </div>
    </div>
  );
};

export default WaterMainInfo;
