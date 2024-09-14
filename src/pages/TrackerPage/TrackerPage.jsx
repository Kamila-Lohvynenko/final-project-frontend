import { useState } from 'react';

import css from './TrackerPage.module.css';

import LogOutModal from './../../components/LogOutModal/LogOutModal';
import Modal from './../../components/Modal/Modal';
import UserSettingsModal from './../../components/UserSettingsModal/UserSettingsModal';
import WaterDetailedInfo from './../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from './../../components/WaterMainInfo/WaterMainInfo';
import WaterModal from './../../components/WaterModal/WaterModal';
import DeleteWaterModal from './../../components/DeleteWaterModal/DeleteWaterModal';

const TrackerPage = () => {
  const [waterModalState, setWaterModalState] = useState({
    isOpen: false,
    operation: null,
  });

  const [isSettingsModalOpen, setSettingsModal] = useState(true);
  const [isDeleteWaterModalOpen, setDeleteWaterModal] = useState(false);
  const [isLogoutModalOpen, setLogoutModal] = useState(false);

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'waterModal':
        setWaterModalState({
          isOpen: false,
          operation: null,
        });
        break;

      case 'settingsModal':
        setSettingsModal(false);
        break;

      case 'deleteWaterModal':
        setDeleteWaterModal(false);
        break;

      case 'logoutModal':
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
      TrackerPage
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
        />
      </div>
      <Modal isOpen={waterModalState.isOpen} setState={closeWaterModal}>
        <WaterModal
          operation={waterModalState.operation}
          onClose={closeModal}
        />
      </Modal>
      <Modal isOpen={isSettingsModalOpen} setState={setSettingsModal}>
        <UserSettingsModal onClose={closeModal} />
      </Modal>
      <Modal isOpen={isDeleteWaterModalOpen} setState={setDeleteWaterModal}>
        <LogOutModal onClose={closeModal} />
      </Modal>
      <Modal isOpen={isLogoutModalOpen} setState={setLogoutModal}>
        <DeleteWaterModal onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default TrackerPage;
