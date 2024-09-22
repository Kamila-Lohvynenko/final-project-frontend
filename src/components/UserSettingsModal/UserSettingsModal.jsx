import css from './UserSettingsModal.module.css';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';
import { Toaster } from 'react-hot-toast';

const UserSettingsModal = ({ onClose }) => {
  return (
    <>
      <div className={css.container}>
        <h1 className={css.title}>Setting</h1>
        <UserSettingsForm onClose={onClose} />
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default UserSettingsModal;
