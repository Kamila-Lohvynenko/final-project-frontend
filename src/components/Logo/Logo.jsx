// Logo.js
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import css from './Logo.module.css';

const Logo = () => {
  const { i18n } = useTranslation();
  const [isEngLanguage, setIsEngLanguage] = useState(localStorage.getItem('i18nextLng') === 'en');

  const toggleLanguage = () => {
    const newLanguage = isEngLanguage ? 'ua' : 'en';
    setIsEngLanguage(newLanguage === 'en');
    localStorage.setItem('i18nextLng', newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className={css.logo_block}>
      <p className={css.logo}>AquaTrack</p>
      <button 
        className={css.languageSwitcher} 
        onClick={toggleLanguage}
      >
        <span className={css.text}>{isEngLanguage ? 'En' : 'Ua'}</span>
        <span className={css.arrow}>▼</span> {/* Стрелочка */}
      </button>
    </div>
  );
};

export default Logo;
