import { useSelector } from 'react-redux';
import UserBar from '../UserBar/UserBar';
import css from './UserPanel.module.css';
import { selectName } from '../../redux/user/selectors';
import { useTranslation } from 'react-i18next';

const UserPanel = ({ setSettingsModal, setLogoutModal }) => {
  const { t } = useTranslation();
  const userName = useSelector(selectName);

  return (
    <div className={css.userPanel}>
      <h2>
        {t('userPanel.greeting', { name: userName || t('userPanel.guest') })}
      </h2>
      <UserBar
        setSettingsModal={setSettingsModal}
        setLogoutModal={setLogoutModal}
      />
    </div>
  );
};

export default UserPanel;
