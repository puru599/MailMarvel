import { createSlice } from "@reduxjs/toolkit";

const initialEmailState = {
  inbox: [],
  sent: [],
};

const EmailSlice = createSlice({
  name: "email",
  initialState: initialEmailState,
  reducers: {
    setInbox: (state, action) => {
      state.inbox = action.payload;
    },
    setSent: (state, action) => {
      state.sent = action.payload;
    },
    inboxMailRead: (state, action) => {
      const index = state.inbox.findIndex((mail) => {
        return mail.id === action.payload.id;
      });
      state.inbox[index] = { ...state.inbox[index], read: action.payload.bool };
    },
    sentMailRead: (state, action) => {
      const index = state.sent.findIndex((mail) => {
        return mail.id === action.payload.id;
      });
      state.sent[index] = { ...state.sent[index], read: action.payload.bool };
    },
    inboxMailDelete: (state, action) => {
      state.inbox = state.inbox.filter((mail) => {
        return mail.id !== action.payload;
      });
    },
    sentMailDelete: (state, action) => {
      state.sent = state.sent.filter((mail) => {
        return mail.id !== action.payload;
      });
    },
  },
});

export const EmailActions = EmailSlice.actions;

export default EmailSlice.reducer;
