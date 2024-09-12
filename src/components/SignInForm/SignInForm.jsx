import { useId } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

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
      <h2>Sign In</h2>
      <form>
        <label htmlFor={emailId}>Email</label>
        <input type="email" id={emailId} placeholder="Enter your email" />

        <label htmlFor={passwordId}>Password</label>
        <input
          type="password"
          id={passwordId}
          placeholder="Enter your password"
        />

        <button type="submit"></button>
      </form>
      <p>
        Don’t have an account?
        <NavLink to="/signup">Sign Up</NavLink>
      </p>
    </>
  );
};

export default SignInForm;
