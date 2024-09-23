import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import css from './SignUpPage.module.css';
import { Toaster } from 'react-hot-toast';

const SignUpPage = () => {
  return (
    <>
      <div className={css.wrapper}>
        <div className={css.form}>
          <SignUpForm />
        </div>
        <div className={css.box}>
          <AdvantagesSection />
        </div>
        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default SignUpPage;
