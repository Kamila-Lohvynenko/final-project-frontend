import { useId, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import css from './SignUpForm.module.css';
import sprite from '../../images/sprite.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/user/operations';
import { toast } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import GoogleAuth from '../GoogleAuth/GoogleAuth.jsx';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import ChangeLanguageBtn from '../ChangeLanguageBtn/ChangeLanguageBtn';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required('Required'),
  password: Yup.string().min(10, 'Too short!').required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (values) => {
    setIsLoading(true);
    dispatch(
      registerUser({
        email: values.email,
        password: values.password,
      }),
    )
      .unwrap()
      .then((response) => {
        setIsLoading(false);
        localStorage.setItem('token', response.token);
        navigate('/tracker');
        reset();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(`Error: ${error || 'Something went wrong'}`);
        // toast.error(`Error: ${error}`);
      });
  };

  const emailId = useId();
  const passwordId = useId();
  const repeatPasswordId = useId();

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false);

  return (
    <>
      <div className={css.wrapper_logo}>
        <div className={css.logo}>
          <Logo />
        </div>
        <ChangeLanguageBtn />
      </div>

      <div className={css.wrapper}>
        {isLoading && (
          <div className={css.loaderContainer}>
            <Loader />
          </div>
        )}
        <h2 className={css.title}>{t('signUp.title')}</h2>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className={css.field}>
            <label htmlFor={emailId} className={css.label}>
              {t('signUp.email')}
            </label>
            <input
              type="email"
              {...register('email')}
              id={emailId}
              placeholder={t('signUp.email')}
              className={`${css.input} ${errors.email ? css.error : ''}`}
              onBlur={() => trigger('email')}
            />
            {errors.email && (
              <p className={css.errorMessage}>{t(errors.email.message)}</p>
            )}
          </div>

          <div className={css.field}>
            <label htmlFor={passwordId} className={css.label}>
              {t('signUp.password')}
            </label>
            <div className={css.wrapperIcon}>
              <input
                type={visiblePassword ? 'text' : 'password'}
                {...register('password')}
                id={passwordId}
                placeholder={t('signUp.password')}
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
              <p className={css.errorMessage}>{t(errors.password.message)}</p>
            )}
          </div>

          <div className={css.field}>
            <label htmlFor={repeatPasswordId} className={css.label}>
              {t('signUp.repeatPassword')}
            </label>
            <div className={css.wrapperIcon}>
              <input
                type={visibleRepeatPassword ? 'text' : 'password'}
                {...register('repeatPassword')}
                id={repeatPasswordId}
                placeholder={t('signUp.repeatPassword')}
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
                {t(errors.repeatPassword.message)}
              </p>
            )}
          </div>

          <div className={css.buttonWrapper}>
            <button type="submit" className={css.btn}>
              {t('signUp.title')}
            </button>
            <GoogleAuth buttonText={t('signUp.googleAuth')} />
          </div>
        </form>
        <p className={css.auth}>
          {t('signUp.alreadyHaveAccount')}
          <NavLink className={css.navlink} to="/signin">
            {t('signUp.signIn')}
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
