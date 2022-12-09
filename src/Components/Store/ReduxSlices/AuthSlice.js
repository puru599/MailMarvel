import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  email: localStorage.getItem("email"),
  idToken: localStorage.getItem("idToken"),
  regexEmail: localStorage.getItem("regexEmail"),
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
      state.regexEmail = action.payload.regexEmail;
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("idToken", action.payload.idToken);
      localStorage.setItem("regexEmail", action.payload.regexEmail);
    },
  },
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;
