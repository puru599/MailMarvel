import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./ReduxSlices/AuthSlice";
import EmailSlice from "./ReduxSlices/EmailSlice";

const Store = configureStore({
  reducer: { auth: AuthSlice, email: EmailSlice },
});

export default Store;
