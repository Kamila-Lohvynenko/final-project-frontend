import { useId, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import * as Yup from 'yup';
import css from './SignUpForm.module.css';
import sprite from '../../images/sprite.svg';

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email('Must be a valid email').required('Required'),
//   password: Yup.string().min(10, 'Too short!').required('Required'),
// });

const SignUpForm = () => {
  const emailId = useId();
  const passwordId = useId();
  const repeatPasswordId = useId();

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false);
  return (
    <>
      <div className={css.wrapper}>
        <h2 className={css.title}>Sign Up</h2>
        <form>
          <div className={css.field}>
            <label htmlFor={emailId} className={css.label}>
              Email
            </label>
            <input
              type="email"
              id={emailId}
              placeholder="Enter your email"
              className={css.input}
            />
          </div>

          <div className={css.field}>
            <label htmlFor={passwordId} className={css.label}>
              Password
            </label>
            <div className={css.wrapperIcon}>
              <input
                type={visiblePassword ? 'text' : 'password'}
                id={passwordId}
                placeholder="Enter your password"
                className={css.input}
              />
              <svg
                className={css.icon}
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
          <div className={css.field}>
            <label htmlFor={repeatPasswordId} className={css.label}>
              Repeat password
            </label>
            <div className={css.wrapperIcon}>
              <input
                type={visibleRepeatPassword ? 'text' : 'password'}
                id={repeatPasswordId}
                placeholder="Repeat password"
                className={css.input}
              />
              <svg
                className={css.icon}
                width={20}
                height={20}
                onClick={() => setVisibleRepeatPassword(!visibleRepeatPassword)}
              >
                <use
                  href={`${sprite}#${
                    visibleRepeatPassword ? 'icon-eye' : 'icon-eye-off'
                  }`}
                />
              </svg>
            </div>
          </div>
          <button type="submit" className={css.btn}>
            Sign Up
          </button>
        </form>
        <p className={css.auth}>
          Already have an account?
          <NavLink className={css.navlink} to="/signin">
            Sign In
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
