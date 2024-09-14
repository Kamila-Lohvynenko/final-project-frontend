import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import css from './SignUpPage.module.css';

const SignUpPage = () => {
  return (
    <>
      <div className={css.wrapper}>
          <SignUpForm />
      </div>
    </>
  );
};

export default SignUpPage;
