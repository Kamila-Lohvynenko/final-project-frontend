import css from './SharedLayout.module.css';

const SharedLayout = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};

export default SharedLayout;
