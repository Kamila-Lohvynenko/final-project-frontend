import { useId, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import styles from './SignInForm.module.css';
import sprite from '../../images/sprite.svg';
import Logo from '../Logo/Logo';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../redux/user/operations';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import Loader from '../Loader/Loader';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required('Required'),
  password: Yup.string().min(10, 'Too short!').required('Required'),
});

const SignInForm = () => {
  const emailId = useId();
  const passwordId = useId();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setLoading(true);
    dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      }),
    )
      .unwrap()
      .then((response) => {
        console.log(response);

        toast.success('Log in is successful!');
        reset();
        navigate('/tracker');
      })
      .catch((error) => {
        console.error('Error details:', error);
        toast.error(`Error: wrong password or email! Please try again`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {/* {loading && <Loader className={'overlay'} />} */}
      <div className={styles.logo}>
        <Logo />
      </div>
      {loading && <Loader />}
      <div className={styles.wrapperSignIn}>
        <h2 className={styles.title}>Sign In</h2>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div className={styles.field}>
            <label htmlFor={emailId} className={styles.label}>
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              id={emailId}
              placeholder="Enter your email"
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              onBlur={() => trigger('email')}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor={passwordId} className={styles.label}>
              Password
            </label>
            <div className={styles.wrapper_icon}>
              <input
                type={visiblePassword ? 'text' : 'password'}
                {...register('password')}
                id={passwordId}
                placeholder="Enter your password"
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
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )}
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
        <p className={styles.recover}>
          Forgot your password?
          <NavLink className={styles.navlink} to="/reset-password">
            Recover password
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
