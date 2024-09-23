import { useDispatch } from 'react-redux';
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

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required('Required'),
});

const EmailForm = () => {
  const { t } = useTranslation();
  const emailId = useId();
  const [loading, setLoading] = useState(false);

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
      toast.success(response.data.message);
      reset();
    } catch (error) {
      toast.error(t('email_form.error_user_not_found'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.logo}>
        <Logo />
      </div>
      {loading && <Loader />}
      <div className={styles.wrapperSignIn}>
        <h2 className={styles.title}>{t('email_form.title')}</h2>
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
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
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


















































































































// import { useDispatch } from 'react-redux';
// import Logo from '../Logo/Logo';
// import styles from './EmailForm.module.css';
// import { useId, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-hot-toast';
// import Loader from '../Loader/Loader';
// import { axiosInstance } from '../../services/axios.config';

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email('Must be a valid email').required('Required'),
// });
// const EmailForm = () => {
//   const emailId = useId();
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     trigger,
//   } = useForm({
//     values: { email: '' },
//     resolver: yupResolver(validationSchema),
//     mode: 'onBlur',
//   });

//   //   const onSubmit = (values) => {
//   //     setLoading(true);
//   //     dispatch(
//   //       loginUser({
//   //         email: values.email,
//   //         password: values.password,
//   //       }),
//   //     )
//   //       .unwrap()
//   //       .then((response) => {
//   //         console.log(response);

//   //         toast.success('Log in is successful!');
//   //         reset();
//   //         navigate('/tracker');
//   //       })
//   //       .catch((error) => {
//   //         console.error('Error details:', error);
//   //         toast.error(`Error: wrong password or email! Please try again`);
//   //       })
//   //       .finally(() => {
//   //         setLoading(false);
//   //       });
//   //   };

//   const onSubmit = async (value) => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.post('/users/send-reset-email', {
//         email: value.email,
//       });
//       console.log(response);
//       toast.success(response.data.message);
//       reset();
//     } catch (error) {
//       toast.error('Error: user not found!');
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <>
//       <div className={styles.logo}>
//         <Logo />
//       </div>
//       {loading && <Loader />}
//       <div className={styles.wrapperSignIn}>
//         <h2 className={styles.title}>Change password</h2>
//         <form
//           noValidate
//           autoComplete="off"
//           onSubmit={handleSubmit(onSubmit)}
//           className={styles.form}
//         >
//           <div className={styles.field}>
//             <label htmlFor={emailId} className={styles.label}>
//               Email
//             </label>
//             <input
//               type="email"
//               {...register('email')}
//               id={emailId}
//               placeholder="Enter your email"
//               className={`${styles.input} ${errors.email ? styles.error : ''}`}
//               onBlur={() => trigger('email')}
//             />
//             {errors.email && (
//               <p className={styles.errorMessage}>{errors.email.message}</p>
//             )}
//           </div>

//           <button type="submit" className={styles.btn}>
//             Send
//           </button>
//         </form>
//         <p className={styles.auth}>
//           Back to the main page
//           <NavLink className={styles.navlink} to="/">
//             Home page
//           </NavLink>
//         </p>
//       </div>
//     </>
//   );
// };

// export default EmailForm;
