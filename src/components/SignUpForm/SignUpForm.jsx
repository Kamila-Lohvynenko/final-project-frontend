import { useId, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import css from './SignUpForm.module.css';
import sprite from '../../images/sprite.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { register as registerUser } from '../../redux/user/operations';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required('Required'),
  password: Yup.string().min(5, 'Too short!').required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    values: { email: '', password: '', repeatPassword: '' },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const onSubmit = (values) => {
    dispatch(
      registerUser({
        email: values.email,
        password: values.password,
      }),
    )
      .unwrap()
      .then(() => {
        reset();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const emailId = useId();
  const passwordId = useId();
  const repeatPasswordId = useId();

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false);

  return (
    <>
      <div className={css.wrapper}>
        <h2 className={css.title}>Sign Up</h2>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className={css.field}>
            <label htmlFor={emailId} className={css.label}>
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              id={emailId}
              placeholder="Enter your email"
              className={`${css.input} ${errors.email ? css.error : ''}`}
              onBlur={() => trigger('email')}
            />
            {errors.email && (
              <p className={css.errorMessage}>{errors.email.message}</p>
            )}
          </div>

          <div className={css.field}>
            <label htmlFor={passwordId} className={css.label}>
              Password
            </label>
            <div className={css.wrapperIcon}>
              <input
                type={visiblePassword ? 'text' : 'password'}
                {...register('password')}
                id={passwordId}
                placeholder="Enter your password"
                className={`${css.input} ${errors.password ? css.error : ''}`}
                onBlur={() => trigger('password')}
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
            {errors.password && (
              <p className={css.errorMessage}>{errors.password.message}</p>
            )}
          </div>
          <div className={css.field}>
            <label htmlFor={repeatPasswordId} className={css.label}>
              Repeat password
            </label>
            <div className={css.wrapperIcon}>
              <input
                type={visibleRepeatPassword ? 'text' : 'password'}
                {...register('repeatPassword')}
                id={repeatPasswordId}
                placeholder="Repeat password"
                className={`${css.input} ${
                  errors.repeatPassword ? css.error : ''
                }`}
                onBlur={() => trigger('repeatPassword')}
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
            {errors.repeatPassword && (
              <p className={css.errorMessage}>
                {errors.repeatPassword.message}
              </p>
            )}
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
