import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import SignIn from "./Components/Pages/SignIn/SignIn";
import SignUp from "./Components/Pages/SignUp/SignUp";
import MailHome from "./Components/Pages/Home/MailHome/MailHome";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.email);
  return (
    <React.Fragment>
      {!!isLoggedIn && (
        <Route path="*">
          <Redirect to="/MailHome" />
        </Route>
      )}
      {!isLoggedIn && (
        <Route path="*">
          <Redirect to="/SignIn" />
        </Route>
      )}
      <Route path="/SignUp">
        <SignUp />
      </Route>
      <Route path="/SignIn">
        <SignIn />
      </Route>
      <Route path="/MailHome">
        <MailHome />
      </Route>
    </React.Fragment>
  );
}

export default App;
