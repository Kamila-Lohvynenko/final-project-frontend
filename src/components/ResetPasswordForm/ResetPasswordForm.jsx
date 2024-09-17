import { useId, useState } from 'react';
import * as Yup from 'yup';
import styles from './ResetPasswordForm.module.css';
import sprite from '../../images/sprite.svg';
import Logo from '../Logo/Logo';
import Loader from '../Loader/Loader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';

const ResetPasswordForm = () => {
  const passwordId = useId();
  const repeatPasswordId = useId();

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(10, 'Too short!').required('Required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    values: { email: '', password: '' },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className={styles.logo}>
        <Logo />
      </div>
      {/* {loading && <Loader />} */}
      <div className={styles.wrapperSignIn}>
        <h2 className={styles.title}>Change password</h2>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div className={styles.field}>
            <label htmlFor={passwordId} className={styles.label}>
              Password
            </label>
            <div className={styles.wrapper_icon}>
              <input
                type={visiblePassword ? 'text' : 'password'}
                {...register('password')}
                id={passwordId}
                placeholder="Enter new password"
                className={`${styles.input} ${
                  errors.password ? styles.error : ''
                }`}
                onBlur={() => trigger('password')}
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
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor={repeatPasswordId} className={styles.label}>
              Repeat password
            </label>
            <div className={styles.wrapper_icon}>
              <input
                type={visibleRepeatPassword ? 'text' : 'password'}
                {...register('repeatPassword')}
                id={repeatPasswordId}
                placeholder="Repeat your password"
                className={`${styles.input} ${
                  errors.repeatPassword ? styles.error : ''
                }`}
                onBlur={() => trigger('repeatPassword')}
              />
              <svg
                className={styles.icon_eye}
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
              {errors.repeatPassword && (
                <p className={styles.errorMessage}>
                  {errors.repeatPassword.message}
                </p>
              )}
            </div>
          </div>
          <button type="submit" className={styles.btn}>
            Send
          </button>
        </form>
        <p className={styles.auth}>
          Already have an account?
          <NavLink className={styles.navlink} to="/signin">
            Sign In
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default ResetPasswordForm;
