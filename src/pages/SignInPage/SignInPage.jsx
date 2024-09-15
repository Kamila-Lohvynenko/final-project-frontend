import { Toaster } from 'react-hot-toast';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import SignInForm from '../../components/SignInForm/SignInForm';
import styles from './SignInPage.module.css';

const SignInPage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <SignInForm />
        </div>
        <div className={styles.box}>
          <AdvantagesSection />
        </div>
        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default SignInPage;
