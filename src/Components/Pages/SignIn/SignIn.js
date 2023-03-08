import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "../../Layout/UI/Form";
import Button from "../../Layout/UI/Button";
import classes from "./SignIn.module.css";
import { useDispatch } from "react-redux";
import { SignInAction } from "../../Store/ActionCreators/AuthActions";
import React from "react";

const SignIn = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

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
    <div className={classes.SignInForm}>
      <Form onSubmit={signInHandler}>
        <div className={classes.SignIn}>
          <img src={require("../../../Assets/logo3.png")} alt="Mail Box" />
          <span className={classes.SignIn1}>Sign In</span>
          <span>to continue to Mail Box Client.</span>
        </div>
        <div
          className={`${
            errorValid ? classes.SignInError : classes.SignInInputs
          }`}
        >
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
          <Link to="/SignUp">Create Account</Link>
          <Button>Sign In</Button>
        </div>
        {errorValid && <h4 className={classes.SignInError}>{errorMessage}</h4>}
      </Form>
    </div>
  );
};

export default SignIn;
