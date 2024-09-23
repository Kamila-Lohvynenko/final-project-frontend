import css from './Loader.module.css';
import clsx from 'clsx/lite';
import { useTranslation } from 'react-i18next';

const Loader = ({ className }) => {
  const { t } = useTranslation();
  const classCss = clsx(css.loader, className && css[className]);

  return (
    <div className={css.wrapper}>
      <div className={classCss}></div>
      <div>{t('loader.loading')}</div>
    </div>
  );
};

export default Loader;

