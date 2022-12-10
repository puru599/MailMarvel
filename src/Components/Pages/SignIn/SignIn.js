import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "../../Layout/UI/Form";
import Button from "../../Layout/UI/Button";
import classes from "./SignIn.module.css";
import { useDispatch } from "react-redux";
import { SignInAction } from "../../Store/ActionCreators/AuthActions";
import useFetch from "../../../Hooks/use-fetch";
import React from "react";

const SignIn = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  useFetch();

  const [errorValid, setErrorValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory("");

  const signInHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const regex = /[.@]/g;
    const regexEmail = email.replace(regex, "");

    const allow =
      email.length > 0 &&
      email.includes(".com") &&
      email.includes("@") &&
      password.length > 5;
    if (allow) {
      dispatch(SignInAction(email, password, regexEmail, history));
      setErrorValid(false);
    } else {
      setErrorValid(true);
      if (email.length < 1) {
        return setErrorMessage("Please fill the email field.");
      }
      if (!email.includes(".com") || !email.includes("@")) {
        return setErrorMessage("Please enter valid email");
      }
      if (password.length < 1) {
        return setErrorMessage("Please fill the password field");
      }
    }
  };
  return (
    <Form onSubmit={signInHandler}>
      <div className={classes.SignIn}>
        <h3>Sign In</h3>
        <h4>to continue to Mail Box Client.</h4>
      </div>
      <div className={`${errorValid ? classes.SignInError : classes.SignIn}`}>
        <input
          id="emailId"
          placeholder="Email Id"
          ref={emailRef}
          type="text"
        ></input>
        <input
          id="passwordId"
          placeholder="Password"
          ref={passwordRef}
          type="password"
        ></input>
      </div>
      <div>
        <Link to="/ForgotPassword">Forgot password?</Link>
      </div>
      <div>
        <Link to="/SignUp">Create Account</Link>
        <Button>Sign In</Button>
      </div>
      {errorValid && <h4 className={classes.SignInError}>{errorMessage}</h4>}
    </Form>
  );
};

export default SignIn;
