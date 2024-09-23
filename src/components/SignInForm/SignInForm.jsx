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

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required('Required'),
  password: Yup.string().min(10, 'Too short!').required('Required'),
});

const SignInForm = () => {
  const { t } = useTranslation(); 
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
      <div className={styles.logo}>
        <Logo />
      </div>
      {loading && <Loader />}
      <div className={styles.wrapperSignIn}>
        <h2 className={styles.title}>{t('signIn.title')}</h2> {/* Заголовок */}
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div className={styles.field}>
            <label htmlFor={emailId} className={styles.label}>
              {t('signIn.email')} {/* Лейбл для поля email */}
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
              {t('signIn.password')} {/* Лейбл для поля password */}
            </label>
            <div className={styles.wrapper_icon}>
              <input
                type={visiblePassword ? 'text' : 'password'}
                {...register('password')}
                id={passwordId}
                placeholder={t('signIn.placeholderPassword')}
                className={`${styles.input} ${errors.password ? styles.error : ''}`}
                onBlur={() => trigger('password')}
              />
              <svg
                className={styles.icon_eye}
                width={20}
                height={20}
                onClick={() => setVisiblePassword(!visiblePassword)}
              >
                <use
                  href={`${sprite}#${visiblePassword ? 'icon-eye' : 'icon-eye-off'}`}
                />
              </svg>
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )}
            </div>
          </div>
          <button type="submit" className={styles.btn}>
            {t('signIn.buttonSignIn')} {/* Кнопка для входа */}
          </button>
        </form>
        <p className={styles.auth}>
          {t('signIn.accountPrompt')} {/* Текст для вопроса о регистрации */}
          <NavLink className={styles.navlink} to="/signup">
            {t('signIn.signUp')} {/* Ссылка на регистрацию */}
          </NavLink>
        </p>
        <p className={styles.recover}>
          {t('signIn.recoverPrompt')} {/* Текст для восстановления пароля */}
          <NavLink className={styles.navlink} to="/email-input">
            {t('signIn.recoverPassword')} {/* Ссылка на восстановление пароля */}
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
