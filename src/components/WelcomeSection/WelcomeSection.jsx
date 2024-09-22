import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import css from './WelcomeSection.module.css';
import { useTranslation } from 'react-i18next';
import ChangeLanguageBtn from '../ChangeLanguageBtn/ChangeLanguageBtn';

const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <div className={css.welcome_section__wrap}>
      <div className={css.logo_language__block}>
        <Logo />
        <ChangeLanguageBtn />
      </div>
      <div className={css.welcome_section}>
        <div className={css.hero_section}>
          <p className={css.sub_head}>
            {t('Record daily water intake and track')}
          </p>
          <h1 className={css.main_head}>{t('Water consumption tracker')}</h1>
        </div>

        <div className={css.buttons_block}>
          <Link
            to={'/signup'}
            className={`${css.button} ${css.button_to_signup}`}
          >
            {t('Try tracker')}
          </Link>
          <Link
            to={'/signin'}
            className={`${css.button} ${css.button_to_signin}`}
          >
            {t('Sign In')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
