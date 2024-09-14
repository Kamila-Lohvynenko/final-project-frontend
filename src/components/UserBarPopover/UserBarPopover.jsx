import { useRef, useState, useEffect } from "react";
import { usePopper } from 'react-popper';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import LogOutModal from '../LogOutModal/LogOutModal';
import css from './UserBarPopover.module.css';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';

const UserBarPopover = ({ onClose, buttonRef }) => { 
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [isLogOutOpen, setLogOutOpen] = useState(false);
    const popperRef = useRef(null); 
    const { styles, attributes } = usePopper(buttonRef.current, popperRef.current, {
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
    });

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
        <>
            <div ref={popperRef} style={styles.popper} {...attributes.popper} className={css.userBarPopover}>
                <button onClick={() => setSettingsOpen(true)}>
                    <FaCog className={css.popoverIcon} />Settings
                </button>
                <button onClick={() => setLogOutOpen(true)}>
                    <FaSignOutAlt className={css.popoverIcon} />Log out
                </button>
            </div>
            {isSettingsOpen && <UserSettingsModal onClose={() => setSettingsOpen(false)} />}
            {isLogOutOpen && <LogOutModal onClose={() => setLogOutOpen(false)} />}
        </>
    );
};

export default UserBarPopover;