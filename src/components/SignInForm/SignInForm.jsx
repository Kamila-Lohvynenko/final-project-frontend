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
import { useTranslation } from 'react-i18next';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import ChangeLanguageBtn from '../ChangeLanguageBtn/ChangeLanguageBtn';


const SignInForm = () => {
  const { t } = useTranslation();
  const emailId = useId();
  const passwordId = useId();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('validation.email_invalid')) // Используйте перевод
      .required(t('validation.email_required')), // Используйте перевод
    password: Yup.string()
      .min(10, t('validation.password_min')) // Используйте перевод
      .required(t('validation.password_required')), // Используйте перевод
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
    setLoading(true);
    dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      }),
    )
      .unwrap()
      .then((response) => {
        toast.success(t('signIn.successMessage'));
        reset();
        navigate('/tracker');
      })
      .catch((error) => {
        console.error('Error details:', error);
        toast.error(t('signIn.errorMessage'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className={styles.wrapper_logo}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <ChangeLanguageBtn />
      </div>
      {loading && <Loader />}
      <div className={styles.wrapperSignIn}>
        <h2 className={styles.title}>{t('signIn.title')}</h2>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div className={styles.field}>
            <label htmlFor={emailId} className={styles.label}>
              {t('signIn.email')}
            </label>
            <input
              type="email"
              {...register('email')}
              id={emailId}
              placeholder={t('signIn.placeholderEmail')}
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              onBlur={() => trigger('email')}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor={passwordId} className={styles.label}>
              {t('signIn.password')}
            </label>
            <div className={styles.wrapper_icon}>
              <input
                type={visiblePassword ? 'text' : 'password'}
                {...register('password')}
                id={passwordId}
                placeholder={t('signIn.placeholderPassword')}
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
          <div className={styles.btn_wrapper}>
            <button type="submit" className={styles.btn}>
              {t('signIn.buttonSignIn')}
            </button>
            <GoogleAuth buttonText={t('signUp.googleAuth')} />
          </div>
        </form>
        <p className={styles.auth}>
          {t('signIn.accountPrompt')}
          <NavLink className={styles.navlink} to="/signup">
            {t('signIn.signUp')}
          </NavLink>
        </p>
        <p className={styles.recover}>
          {t('signIn.recoverPrompt')}
          <NavLink className={styles.navlink} to="/email-input">
            {t('signIn.recoverPassword')}
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
