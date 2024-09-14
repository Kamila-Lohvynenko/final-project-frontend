import { useId, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import styles from './SignInForm.module.css';
import sprite from '../../images/sprite.svg';
import Logo from '../Logo/Logo';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required('Required'),
  password: Yup.string().min(10, 'Too short!').required('Required'),
});

const SignInForm = () => {
  const emailId = useId();
  const passwordId = useId();
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.wrapperSignIn}>
        <h2 className={styles.title}>Sign In</h2>
        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor={emailId} className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id={emailId}
              placeholder="Enter your email"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={passwordId} className={styles.label}>
              Password
            </label>
            <div className={styles.wrapper_icon}>
              <input
                type={visiblePassword ? 'text' : 'password'}
                id={passwordId}
                placeholder="Enter your password"
                className={styles.input}
              />
              <svg
                className={styles.icon_eye}
                width={20}
                height={20}
                onClick={() => setVisiblePassword(!visiblePassword)}
              >
                <use
                  href={`${sprite}#${
                    visiblePassword ? 'icon-eye' : 'icon-eye-off'
                  }`}
                />
              </svg>
            </div>
          </div>
          <button type="submit" className={styles.btn}>
            Sign In
          </button>
        </form>
        <p className={styles.auth}>
          Don’t have an account?
          <NavLink className={styles.navlink} to="/signup">
            Sign Up
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
