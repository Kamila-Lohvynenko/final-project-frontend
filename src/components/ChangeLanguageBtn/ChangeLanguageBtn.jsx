import { useTranslation } from 'react-i18next';
import css from './ChangeLanguageBtn.module.css';

const lngs = {
  en: { nativeName: 'EN' },
  ua: { nativeName: 'UA' },
};

const ChangeLanguageBtn = () => {
  const { i18n } = useTranslation();

  return (
    <div className={css.buttons}>
      {Object.keys(lngs).map((lng) => {
        return (
          <button
            type="submit"
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            disabled={i18n.resolvedLanguage === lng}
            className={
              i18n.resolvedLanguage === lng ? css.active_language : ''
            }
          >
            {lngs[lng].nativeName}
          </button>
        );
      })}
    </div>
  );
};

export default ChangeLanguageBtn;
