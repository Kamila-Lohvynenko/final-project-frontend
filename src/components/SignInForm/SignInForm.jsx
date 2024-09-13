import { useId } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import styles from "./SignInForm.module.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email").required("Required"),
  password: Yup.string().min(10, "Too short!").required("Required"),
});

const SignInForm = () => {
  const emailId = useId();
  const passwordId = useId();
  return (
    <>
      {/* <Logo/> */}
      <div className={styles.wrapperSignIn}>
        <h2 className={styles.title}>Sign In</h2>
        <form>
          <div className={styles.field}>
            <label htmlFor={emailId} className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id={emailId}
              placeholder="Enter your email"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={passwordId} className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id={passwordId}
              placeholder="Enter your password"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.btn}>
            Sign In
          </button>
        </form>
        <p className={styles.auth}>
          Don’t have an account?
          <NavLink className={styles.navlink} to="/signup">
            Sign Up
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
