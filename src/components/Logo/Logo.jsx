import css from './Logo.module.css';
import { useTranslation } from 'react-i18next';

const Logo = () => {
  const { t } = useTranslation();

  return (
    <div className={css.logo_block}>
      <p className={css.logo}>{t('logo.title')}</p>
      
    </div>
  );
};

export default Logo;

