import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

const SignIn = React.lazy(() => import("./Components/Pages/SignIn/SignIn"));
const SignUp = React.lazy(() => import("./Components/Pages/SignUp/SignUp"));
const MailHome = React.lazy(() =>
  import("./Components/Pages/Home/MailHome/MailHome")
);
const Welcome = React.lazy(() => import("./Components/Pages/Welcome/Welcome"));

function App() {
  const isLoggedIn = useSelector((state) => state.auth.email);

  return (
    <React.Fragment>
      <Suspense>
        <Switch>
          <Route path="/Welcome">
            <Welcome />
          </Route>
          <Route path="/SignUp">
            {!isLoggedIn ? <SignUp /> : <Redirect to="/MailHome" />}
          </Route>
          <Route path="/SignIn">
            {!isLoggedIn ? <SignIn /> : <Redirect to="/MailHome" />}
          </Route>
          <Route path="/MailHome">
            {isLoggedIn ? <MailHome /> : <Redirect to="/SignIn" />}
          </Route>
          <Route path="*">
            {isLoggedIn ? (
              <Redirect to="/MailHome" />
            ) : (
              <Redirect to="/Welcome" />
            )}
          </Route>
        </Switch>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
