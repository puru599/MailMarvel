import React from "react";
import { Link } from "react-router-dom";
import WelcomeImg from "../../../Assets/welcome.webp";
import classes from "./Welcome.module.css";
import Header from "../../Layout/Header/Header";

const Welcome = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={classes.Welcome}>
        <div>
          <div className={classes.firstLine}>
            Secure, smart, and easy to use email
          </div>
          <div className={classes.secondLine}>
            Get more done with Gmail. Now integrated with Google Chat, Google
            Meet, and more, all in one place.
          </div>
          <Link to="/SignUp" className={classes.Link2}>Create an account</Link>
        </div>
        <img src={WelcomeImg} alt="Welcome" />
      </div>
    </React.Fragment>
  );
};

export default Welcome;
