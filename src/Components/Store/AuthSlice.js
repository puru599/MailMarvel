import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  email: localStorage.getItem("email"),
  idToken: localStorage.getItem("idToken"),
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducer: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
      localStorage.setItem("email", state.email);
      localStorage.setItem("idToken", state.idToken);
    },
  },
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;
