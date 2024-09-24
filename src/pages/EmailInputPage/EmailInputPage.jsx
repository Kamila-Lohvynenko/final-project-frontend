import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import EmailForm from '../../components/EmailForm/EmailForm';
import styles from './EmailInputPage.module.css';
import { Toaster } from 'react-hot-toast';

const EmailInputPage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <EmailForm />
        </div>
        <div className={styles.box}>
          <AdvantagesSection />
        </div>
        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default EmailInputPage;
