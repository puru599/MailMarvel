export const SignUpAction = (email, password, userName) => {
  return async (dispatch) => {
    const SignUpAction = async (email, password, userName) => {
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
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    SignUpAction(email, password, userName);
  };
};

export const SignInAction = (email, password, history) => {
  return async (dispatch) => {
    const SignInAction = async (email, password, history) => {
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
        console.log(data);
        history.replace("/DummyWelcome");
      } catch (error) {
        alert(error.message);
      }
    };
    SignInAction(email, password, history);
  };
};
