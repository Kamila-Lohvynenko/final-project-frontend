import { useState, useRef } from 'react';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import css from './UserBar.module.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import defaultAvatar from './../../images/default_avatar.webp';
import { useSelector } from 'react-redux';
import { selectAvatarUrl, selectName } from './../../redux/user/selectors';

const UserBar = ({ setSettingsModal, setLogoutModal }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const buttonRef = useRef(null);

  const togglePopover = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  const userName = useSelector(selectName);
  const userAvatar = useSelector(selectAvatarUrl);

  return (
    <div className={css.userBar}>
      <button
        onClick={togglePopover}
        className={`${css.userBarButton} ${isPopoverOpen ? css.open : ''}`}
        ref={buttonRef}
      >
        <span className={css.userName}>{userName || 'Guest'} </span>
        <img
          src={userAvatar || defaultAvatar}
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
