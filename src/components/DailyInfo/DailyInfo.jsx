import css from './DailyInfo.module.css';
import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';
import { OPERATION_NAME } from '../../constants';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/water/selectors';
import Loader from './../Loader/Loader';

const DailyInfo = ({
  openWaterModal,
  setDeleteWaterModal,
  chosenDate,
  setWater,
}) => {
  const handleAddWaterClick = () => {
    openWaterModal({ isOpen: true, operation: OPERATION_NAME.ADD_WATER });
  };

  const handleEditWaterClick = () => {
    openWaterModal({ isOpen: true, operation: OPERATION_NAME.EDIT_WATER });
  };

  const handleDeleteWaterClick = () => {
    setDeleteWaterModal(true);
  };

  const loading = useSelector(selectLoading);

  return (
    <div>
      <div className={`${css.topContainer} five-step`}>
        <ChooseDate chosenDate={chosenDate} />
        <AddWaterBtn inDetails={true} onClick={handleAddWaterClick} />
      </div>
      <div>
        {loading ? (
          <Loader classCss="dailyInfo" />
        ) : (
          <WaterList
            openWaterModal={handleEditWaterClick}
            setDeleteWaterModal={handleDeleteWaterClick}
            setWater={setWater}
          />
        )}
        {/* <WaterList openWaterModal={handleEditWaterClick} setDeleteWaterModal={handleDeleteWaterClick} setWater={setWater} /> */}
      </div>
    </div>
  );
};

export default DailyInfo;
