import { useSelector } from 'react-redux';
import UserBar from '../UserBar/UserBar';
import css from './UserPanel.module.css';
import { selectName } from '../../redux/user/selectors';

const UserPanel = ({ setSettingsModal, setLogoutModal }) => {
  const userName = useSelector(selectName);

  return (
    <div className={css.userPanel}>
      <h2>
        Hello, <strong>{userName || 'Guest'}!</strong>
      </h2>
      <UserBar
        setSettingsModal={setSettingsModal}
        setLogoutModal={setLogoutModal}
      />
    </div>
  );
};
export default UserPanel;
