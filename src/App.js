import React from "react";
import { Redirect, Route } from "react-router-dom";
import MailHome from "./Components/Pages/MailHome/MailHome";
import SignIn from "./Components/Pages/SignIn/SignIn";
import SignUp from "./Components/Pages/SignUp/SignUp";

function App() {
  return (
    <React.Fragment>
      <Route path="*">
        <Redirect to="/SignIn" />
      </Route>
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
