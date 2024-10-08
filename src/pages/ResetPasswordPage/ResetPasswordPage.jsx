import { Toaster } from 'react-hot-toast';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import styles from '../ResetPasswordPage/ResetPasswordPage.module.css';

const ResetPasswordPage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <ResetPasswordForm />
        </div>
        <div className={styles.box}>
          <AdvantagesSection />
        </div>
        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default ResetPasswordPage;
