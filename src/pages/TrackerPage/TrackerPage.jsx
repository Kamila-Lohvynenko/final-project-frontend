import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../redux/user/operations';
import { getWaterByDay, getWaterByMonth } from '../../redux/water/operations';
import { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import WaterMainInfo from './../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from './../../components/WaterDetailedInfo/WaterDetailedInfo';
import Modal from './../../components/Modal/Modal';
import WaterModal from './../../components/WaterModal/WaterModal';
import DeleteWaterModal from './../../components/DeleteWaterModal/DeleteWaterModal';
import UserSettingsModal from './../../components/UserSettingsModal/UserSettingsModal';
import LogOutModal from './../../components/LogOutModal/LogOutModal';
import { MODAL_NAME } from '../../constants';
import css from './TrackerPage.module.css';
import TourSteps from './../../onboarding/onbordingStep'; 

const TrackerPage = () => {
  const [isLoading, setIsLoading] = useState(true);
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
  const [water, setWater] = useState(null);
  
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(getUserData()).unwrap();
      await dispatch(
        getWaterByMonth({ month: chosenDate.month, year: chosenDate.year }),
      ).unwrap();
      await dispatch(getWaterByDay(chosenDate)).unwrap();

      setIsLoading(false);
    }

    fetchData();
  }, [dispatch, chosenDate]);

  const closeModal = (modalName) => {
    switch (modalName) {
      case MODAL_NAME.WATER_MODAL:
        setWaterModalState({ isOpen: false, operation: null });
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

  // Логика для онбординга
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    if (!onboardingCompleted || onboardingCompleted === "false") {
      setShowTour(true);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true");
    setShowTour(false);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={css.pageWrapper}>
          {showTour ? (
            <TourSteps onComplete={completeOnboarding}>
              <WaterMainInfo
                waterModalState={waterModalState}
                openWaterModal={openWaterModal}
                chosenDate={chosenDate}
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
            </TourSteps>
          ) : (
            <>
              <WaterMainInfo
                waterModalState={waterModalState}
                openWaterModal={openWaterModal}
                chosenDate={chosenDate}
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
            </>
          )}
        </div>
      )}

      <Toaster position="top-right" />
      <Modal isOpen={waterModalState.isOpen} setState={closeWaterModal}>
        <WaterModal
          operation={waterModalState.operation}
          onClose={closeModal}
          water={water}
          setWater={setWater}
          chosenDate={chosenDate}
        />
      </Modal>
      <Modal isOpen={isSettingsModalOpen} setState={setSettingsModal}>
        <UserSettingsModal onClose={closeModal} />
      </Modal>
      <Modal isOpen={isDeleteWaterModalOpen} setState={setDeleteWaterModal}>
        <DeleteWaterModal
          onClose={closeModal}
          water={water}
          setWater={setWater}
        />
      </Modal>
      <Modal isOpen={isLogoutModalOpen} setState={setLogoutModal}>
        <LogOutModal onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default TrackerPage;
