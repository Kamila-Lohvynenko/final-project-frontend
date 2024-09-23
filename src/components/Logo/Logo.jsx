import css from './Logo.module.css';

const Logo = () => {
  return (
    <div className={css.logo_block}>
      <p className={css.logo}>AquaTrack</p>
    </div>
  );
};

export default Logo;
