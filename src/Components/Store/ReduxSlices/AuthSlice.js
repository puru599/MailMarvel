import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  email: localStorage.getItem("email"),
  idToken: localStorage.getItem("idToken"),
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("idToken", action.payload.idToken);
    },
  },
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;
