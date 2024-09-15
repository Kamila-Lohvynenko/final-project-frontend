import css from './Loader.module.css';
import clsx from 'clsx/lite';

const Loader = ({ className }) => {
  const classCss = clsx(css.loader, className && css[className]);
  return (
    <div className={css.wrapper}>
      <div className={classCss}></div>
      <div>Is loading...</div>
    </div>
  );
};

export default Loader;
