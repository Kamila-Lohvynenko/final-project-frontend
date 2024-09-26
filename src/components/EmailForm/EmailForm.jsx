import Logo from '../Logo/Logo';
import styles from './EmailForm.module.css';
import { useId, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { axiosInstance } from '../../services/axios.config';
import { useTranslation } from 'react-i18next';
import ChangeLanguageBtn from '../ChangeLanguageBtn/ChangeLanguageBtn';

const EmailForm = () => {
  const { t } = useTranslation();
  const emailId = useId();
  const [loading, setLoading] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('validation.email_invalid'))
      .required(t('validation.email_required'))
      .matches(
        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        'Please enter valid email',
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    values: { email: '' },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (value) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/users/send-reset-email', {
        email: value.email,
      });
      console.log(response);
      toast.success(response.data.message, {
        duration: 2500,
      });
      reset();
      setSendEmail(true);
    } catch (error) {
      toast.error(t('email_form.error_user_not_found'), {
        duration: 2500,
      });
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
        <ChangeLanguageBtn />
      </div>
      {loading && <Loader />}

      <div className={styles.wrapperSignIn}>
        <h2 className={styles.title}>{t('email_form.title')}</h2>

        {sendEmail ? (
          <div className={styles.email_send}>{t('email_form.follow_link')}</div>
        ) : (
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
          >
            <div className={styles.field}>
              <label htmlFor={emailId} className={styles.label}>
                {t('email_form.email')}
              </label>
              <input
                type="email"
                {...register('email')}
                id={emailId}
                placeholder={t('email_form.enter_email')}
                className={`${styles.input} ${
                  errors.email ? styles.error : ''
                }`}
                onBlur={() => trigger('email')}
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )}
            </div>

            <button type="submit" className={styles.btn}>
              {t('email_form.send')}
            </button>
          </form>
        )}

        <p className={styles.auth}>
          {t('email_form.back_to_main')}
          <NavLink className={styles.navlink} to="/">
            {t('email_form.home_page')}
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default EmailForm;
