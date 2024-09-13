import SignInForm from "../../components/SignInForm/SignInForm";
import styles from "./SignInPage.module.css";

const SignInPage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <SignInForm />
        </div>
        <p className={styles.box}>AdvantagesSection</p>
      </div>
    </>
  );
};

export default SignInPage;
