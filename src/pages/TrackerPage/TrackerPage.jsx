import { useEffect, useState } from 'react';

import css from './TrackerPage.module.css';

import LogOutModal from './../../components/LogOutModal/LogOutModal';
import Modal from './../../components/Modal/Modal';
import UserSettingsModal from './../../components/UserSettingsModal/UserSettingsModal';
import WaterDetailedInfo from './../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from './../../components/WaterMainInfo/WaterMainInfo';
import WaterModal from './../../components/WaterModal/WaterModal';
import DeleteWaterModal from './../../components/DeleteWaterModal/DeleteWaterModal';
import { MODAL_NAME } from '../../constants';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../redux/user/operations';
import { getWaterByDay, getWaterByMonth } from '../../redux/water/operations';

const TrackerPage = () => {
  const [waterModalState, setWaterModalState] = useState({
    isOpen: false,
    operation: null,
  });

  const [isSettingsModalOpen, setSettingsModal] = useState(false);
  const [isDeleteWaterModalOpen, setDeleteWaterModal] = useState(false);
  const [isLogoutModalOpen, setLogoutModal] = useState(false);

  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');

  const [chosenDate, setChosenDate] = useState({ year, month, day });

  // console.log(chosenDate);

  const [water, setWater] = useState(null);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserData());
  //   dispatch(getWaterByDay({ day: '14', month: '09', year: '2024' }));
  //   dispatch(getWaterByMonth({ month: '09', year: '2024' }));
  // }, [dispatch]);
  useEffect(() => {
    async function name() {
      // await dispatch(
      //   addWater({
      //     ...chosenDate,
      //     amount: 100,
      //     time: '19:20',
      //   }),
      // ).unwrap();
      await dispatch(getUserData()).unwrap();
      await dispatch(getWaterByDay(chosenDate)).unwrap();
      await dispatch(
        getWaterByMonth({ month: chosenDate.month, year: chosenDate.year }),
      ).unwrap();
    }

    name();
  }, [dispatch, chosenDate]);

  const closeModal = (modalName) => {
    switch (modalName) {
      case MODAL_NAME.WATER_MODAL:
        setWaterModalState({
          isOpen: false,
          operation: null,
        });
        break;

      case MODAL_NAME.SETTINGS_MODAL:
        setSettingsModal(false);
        break;

      case MODAL_NAME.DELETE_WATER_MODAL:
        setDeleteWaterModal(false);
        break;

      case MODAL_NAME.LOGOUT_MODAL:
        setLogoutModal(false);
        break;

      default:
        break;
    }
  };

  const closeWaterModal = (isOpen) => {
    setWaterModalState({ isOpen, operation: null });
  };

  const openWaterModal = ({ isOpen, operation }) => {
    setWaterModalState({ isOpen, operation });
  };

  return (
    <div>
      <div className={css.pageWrapper}>
        <WaterMainInfo
          waterModalState={waterModalState}
          openWaterModal={openWaterModal}
        />
        <WaterDetailedInfo
          openWaterModal={openWaterModal}
          setSettingsModal={setSettingsModal}
          setLogoutModal={setLogoutModal}
          setDeleteWaterModal={setDeleteWaterModal}
          setChosenDate={setChosenDate}
          chosenDate={chosenDate}
          setWater={setWater}
        />
      </div>
      <Modal isOpen={waterModalState.isOpen} setState={closeWaterModal}>
        <WaterModal
          operation={waterModalState.operation}
          onClose={closeModal}
          water={water}
          setWater={setWater}
        />
      </Modal>
      <Modal isOpen={isSettingsModalOpen} setState={setSettingsModal}>
        <UserSettingsModal onClose={closeModal} />
      </Modal>
      <Modal isOpen={isDeleteWaterModalOpen} setState={setDeleteWaterModal}>
        <DeleteWaterModal onClose={closeModal} water={water} />
      </Modal>
      <Modal isOpen={isLogoutModalOpen} setState={setLogoutModal}>
        <LogOutModal onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default TrackerPage;
