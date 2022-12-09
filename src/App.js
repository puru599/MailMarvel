import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import SignIn from "./Components/Pages/SignIn/SignIn";
import SignUp from "./Components/Pages/SignUp/SignUp";
import MailHome from "./Components/Pages/Home/MailHome/MailHome";
import Header from "./Components/Layout/Header/Header";
import MailExpand from "./Components/Pages/Home/MailExpand/MailExpand";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.email);
  return (
    <React.Fragment>
      <Header />
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
      <Route path="/MailHome" exact>
        <MailHome />
      </Route>
      <Route path="/MailHome/:mailId">
        <MailExpand />
      </Route>
    </React.Fragment>
  );
}

export default App;
