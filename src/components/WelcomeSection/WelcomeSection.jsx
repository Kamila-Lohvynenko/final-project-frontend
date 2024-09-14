import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import css from './WelcomeSection.module.css';

const WelcomeSection = () => {
  return (
    <div className={css.welcome_section__wrap}>
      <Logo />

      <div className={css.welcome_section}>
        <div className={css.hero_section}>
          <p className={css.sub_head}>Record daily water intake and track</p>
          <h1 className={css.main_head}>Water consumption tracker</h1>
        </div>

        <div className={css.buttons_block}>
          <Link
            to={'/signup'}
            className={`${css.button} ${css.button_to_signup}`}
          >
            Try tracker
          </Link>
          <Link
            to={'/signin'}
            className={`${css.button} ${css.button_to_signin}`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
