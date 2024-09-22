import { useState, useRef } from 'react';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import css from './UserBar.module.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import defaultAvatar from '../../images/default_avatar.webp';
const UserBar = ({ user, setSettingsModal, setLogoutModal }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const buttonRef = useRef(null);

  const togglePopover = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  return (
    <div className={css.userBar}>
      <button
        onClick={togglePopover}
        className={`${css.userBarButton} ${isPopoverOpen ? css.open : ''}`}
        ref={buttonRef}
      >
        <span>{user?.name || 'Guest'} </span>
        <img
          src={user?.avatar || 'defaultAvatar'}
          alt="User Avatar"
          className={css.userAvatar}
        />

        {isPopoverOpen ? (
          <FaChevronUp className={css.arrow} />
        ) : (
          <FaChevronDown className={css.arrow} />
        )}
      </button>
      {isPopoverOpen && (
        <UserBarPopover
          onClose={togglePopover}
          buttonRef={buttonRef}
          setSettingsModal={setSettingsModal}
          setLogoutModal={setLogoutModal}
        />
      )}
    </div>
  );
};

export default UserBar;
