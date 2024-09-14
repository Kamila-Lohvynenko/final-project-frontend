import { useState, useRef } from "react";
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import css from './UserBar.module.css';
import { FaChevronDown, FaChevronUp  } from 'react-icons/fa';

const UserBar = ({ user }) => {
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
                <span>{user?.name || "Guest"} </span>
                <img src={user?.avatar || 'default-avatar.png'} alt="User Avatar" className={css.userAvatar} />
                
                {isPopoverOpen ? (
                    <FaChevronUp className={css.arrow} />
                ) : (
                    <FaChevronDown className={css.arrow} />
                )}
            </button>
            {isPopoverOpen && <UserBarPopover onClose={togglePopover} buttonRef={buttonRef} />}
        </div>
    );
};

export default UserBar;