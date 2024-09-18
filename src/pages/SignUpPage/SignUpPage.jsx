import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import Logo from '../../components/Logo/Logo.jsx';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import css from './SignUpPage.module.css';
import { Toaster } from 'react-hot-toast';
const SignUpPage = () => {
  return (
    <>
      <div className={css.wrapper}>
        <Toaster />
        <div className={css.logoWrapper}>
          <Logo />
        </div>
        <div className={css.form}>
          <SignUpForm />
        </div>
        <div className={css.box}>
          <AdvantagesSection />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
