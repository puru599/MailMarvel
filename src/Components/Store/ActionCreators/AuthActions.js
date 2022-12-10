import { AuthActions } from "../ReduxSlices/AuthSlice";

export const SignUpAction = (email, password, userName) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9BKVZ07pM0finODCLKs3JlBy0IjHzcKo",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Request Failed");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const SignInAction = (email, password, regexEmail, history) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9BKVZ07pM0finODCLKs3JlBy0IjHzcKo",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const idToken = data.idToken;
      history.replace("/MailHome");
      dispatch(
        AuthActions.login({
          email: email,
          idToken: idToken,
          regexEmail: regexEmail,
        })
      );
    } catch (error) {
      alert(error.message);
    }
  };
};
