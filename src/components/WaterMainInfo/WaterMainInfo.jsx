import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import Logo from '../Logo/Logo.jsx';
import { OPERATION_NAME } from '../../constants/index.js';
import css from '../WaterMainInfo/WaterMainInfo.module.css';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Flag from 'react-world-flags';

const WaterMainInfo = ({ openWaterModal, chosenDate }) => {
  const [isEngLanguage, setIsEngLanguage] = useState(localStorage.getItem('i18nextLng') === 'en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { i18n } = useTranslation();

  const handleAddWaterClick = () => {
    openWaterModal({ isOpen: true, operation: OPERATION_NAME.ADD_WATER });
  };

  const toggleLanguage = (language) => {
    setIsEngLanguage(language === 'en');
    localStorage.setItem('i18nextLng', language);
    i18n.changeLanguage(language);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(`.${css.languageSwitcherContainer}`)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={css.waterContainer}>
        <Logo className={css.waterTitle} />

        <div className={css.languageSwitcherContainer}>
          <button 
            className={css.languageSwitcher} 
            onClick={() => setIsDropdownOpen(prev => !prev)}
          >
            <Flag code={isEngLanguage ? 'US' : 'UA'} className={css.flag} />
            <span className={css.text}>{isEngLanguage ? 'English' : 'Україна'}</span>
            <span className={css.arrow}>▼</span> 
          </button>

          {isDropdownOpen && (
            <div className={css.dropdown}>
              <div onClick={() => toggleLanguage('en')} className={css.dropdownItem}>
                <Flag code='US' className={css.flag} /> English
              </div>
              <div onClick={() => toggleLanguage('ua')} className={css.dropdownItem}>
                <Flag code='UA' className={css.flag} /> Україна
              </div>
            </div>
          )}
        </div>
        <WaterDailyNorma  />
        <WaterProgressBar chosenDate={chosenDate} />
        <AddWaterBtn onClick={handleAddWaterClick} />
      </div>
    </div>
  );
};

export default WaterMainInfo;
