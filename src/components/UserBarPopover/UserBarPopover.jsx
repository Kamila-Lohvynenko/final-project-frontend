import { useRef, useEffect } from 'react';
import { usePopper } from 'react-popper';
import css from './UserBarPopover.module.css';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const UserBarPopover = ({
  onClose,
  buttonRef,
  setSettingsModal,
  setLogoutModal,
}) => {
  const { t } = useTranslation();
  const popperRef = useRef(null);
  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
    {
      placement: 'bottom-start',
      modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['bottom-end', 'top-start', 'top-end'],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 8,
          },
        },
      ],
    },
  );

  const handleClickOutside = (event) => {
    if (popperRef.current && !popperRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={popperRef}
      style={styles.popper}
      {...attributes.popper}
      className={css.userBarPopover}
    >
      <button onClick={() => setSettingsModal(true)} className={css.settingsButton}>
        <FaCog className={css.popoverIcon} />
        {t('userBarPopover.settings')}
      </button>
      <button onClick={() => setLogoutModal(true)} className={css.logOutButton}>
        <FaSignOutAlt className={css.popoverIcon} />
        {t('userBarPopover.logOut')}
      </button>
    </div>
  );
};

export default UserBarPopover;
