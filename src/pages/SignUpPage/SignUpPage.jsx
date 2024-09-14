import Logo from '../../components/Logo/Logo.jsx';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import css from './SignUpPage.module.css';

const SignUpPage = () => {
  return (
    <>
      <div className={css.wrapper}>
        <div className={css.logoWrapper}>
          <Logo />
        </div>
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUpPage;
