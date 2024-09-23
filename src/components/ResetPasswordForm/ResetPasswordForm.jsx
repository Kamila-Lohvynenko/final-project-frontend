import { useId, useState } from 'react';
import * as Yup from 'yup';
import styles from './ResetPasswordForm.module.css';
import sprite from '../../images/sprite.svg';
import Logo from '../Logo/Logo';
import Loader from '../Loader/Loader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../../services/axios.config';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import ChangeLanguageBtn from '../ChangeLanguageBtn/ChangeLanguageBtn';

const ResetPasswordForm = () => {
  const passwordId = useId();
  const repeatPasswordId = useId();

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(10, 'Too short!').required('Required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const [params] = useSearchParams();
  const tokenParams = params.get('token');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    values: { password: '', repeatPassword: '' },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });
  const { t } = useTranslation();
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/users/reset-pwd', {
        password: values.password,
        token: tokenParams,
      });
      toast.success(response.data.message);
      reset();
      navigate('/signin');
    } catch (error) {
      toast.error('Error: user not found or invalid token!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.wrapper_logo}>
        <div className={styles.logo}>
          <Logo />
        </div>
        {loading && <Loader />}
        <ChangeLanguageBtn />
      </div>
      <div className={styles.wrapperSignIn}>
        <h2 className={styles.title}>{t('resetPassword.title')}</h2>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div className={styles.field}>
            <label htmlFor={passwordId} className={styles.label}>
              {t('resetPassword.password')}
            </label>
            <div className={styles.wrapper_icon}>
              <input
                type={visiblePassword ? 'text' : 'password'}
                {...register('password')}
                id={passwordId}
                placeholder={t('resetPassword.placeholderPassword')}
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
                <p className={styles.errorMessage}>
                  {t(errors.password.message)}
                </p>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor={repeatPasswordId} className={styles.label}>
              {t('resetPassword.repeatPassword')}
            </label>
            <div className={styles.wrapper_icon}>
              <input
                type={visibleRepeatPassword ? 'text' : 'password'}
                {...register('repeatPassword')}
                id={repeatPasswordId}
                placeholder={t('resetPassword.placeholderRepeatPassword')}
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
                  {t(errors.repeatPassword.message)}
                </p>
              )}
            </div>
          </div>
          <button type="submit" className={styles.btn}>
            {t('resetPassword.buttonSend')}
          </button>
        </form>
        <p className={styles.auth}>
          {t('resetPassword.accountPrompt')}
          <NavLink className={styles.navlink} to="/signin">
            {t('resetPassword.signIn')}
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default ResetPasswordForm;
