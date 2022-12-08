import React from "react";
import { Redirect, Route } from "react-router-dom";
import DummyWelcome from "./Components/Pages/DummyWelcome";
import SignIn from "./Components/Pages/SignIn/SignIn";
import SignUp from "./Components/Pages/SignUp/SignUp";

function App() {
  return (
    <React.Fragment>
      <Route path="/SignUp">
        <SignUp />
      </Route>
      <Route path="/SignIn">
        <SignIn />
      </Route>
      <Route path="/DummyWelcome">
        <DummyWelcome />
      </Route>
      <Route path="*">
        <Redirect to="/SignIn" />
      </Route>
    </React.Fragment>
  );
}

export default App;
