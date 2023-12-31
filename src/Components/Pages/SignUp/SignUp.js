import Form from "../../Layout/UI/Form";
import React, { useRef, useState } from "react";
import Button from "../../Layout/UI/Button";
import classes from "./SignUp.module.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignUpAction } from "../../Store/ActionCreators/AuthActions";

const SignUp = () => {
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const [errorMessage, setErrorMessage] = useState("");
  const [errorValid, seterrorValid] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const signUpHandler = (event) => {
    event.preventDefault();
    
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const allow =
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      email.includes(".com") &&
      email.includes("@") &&
      password.length > 5 &&
      password === confirmPassword;

    if (allow) {
      dispatch(SignUpAction(email, password, history));
      seterrorValid(false);
    } else {
      seterrorValid(true);
      if (firstName.length < 1 || lastName.length < 1) {
        return setErrorMessage("Please fill the username fields");
      }
      if (email.length < 1) {
        return setErrorMessage("Please fill the email field.");
      }
      if (!email.includes(".com") || !email.includes("@")) {
        return setErrorMessage("Please enter valid email");
      }
      if (password.length < 1 || confirmPassword.length < 1) {
        return setErrorMessage("Please fill the password fields");
      }
      if (password !== confirmPassword) {
        return setErrorMessage("Please match password with confirm password");
      }
    }

    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";

  };
  return (
    <div className={classes.SignUpForm}>
      <Form onSubmit={signUpHandler}>
        <div className={classes.SignInText}>
          <img src={require("../../../Assets/logo3.png")} alt="Mail Box" />
          <span>Create your Mail Box Account</span>
        </div>
        <div
          className={`${
            errorValid ? classes.SignUpError : classes.SignUpInputs
          }`}
        >
          <input
            id="firstNameId"
            placeholder="First name"
            ref={firstNameRef}
            type="text"
          ></input>
          <input
            id="lastNameId"
            placeholder="Last name"
            ref={lastNameRef}
            type="text"
          ></input>
        </div>
        <div
          className={`${
            errorValid ? classes.SignUpError : classes.SignUpInputs
          }`}
        >
          <input
            id="emailId"
            placeholder="Email Id"
            ref={emailRef}
            type="text"
          ></input>
        </div>
        <div
          className={`${
            errorValid ? classes.SignUpError : classes.SignUpInputs
          }`}
        >
          <input
            id="passwordId"
            placeholder="Password"
            ref={passwordRef}
            type="password"
          ></input>
          <input
            id="confirmPasswordId"
            placeholder="Confirm password"
            ref={confirmPasswordRef}
            type="password"
          ></input>
        </div>
        <div>
          <Link to="/SignIn">Sign in instead</Link>
          <Button>Create Account</Button>
        </div>
        {errorValid && <h4 className={classes.SignUpError}>{errorMessage}</h4>}
      </Form>
    </div>
  );
};

export default SignUp;
