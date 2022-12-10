import { EmailActions } from "../ReduxSlices/EmailSlice";

export const SendEmailAction = (
  localEmail,
  fromRegexEmail,
  toRegexEmail,
  toEmail,
  subject,
  message,
  timeStamp
) => {
  return async (dispatch) => {
    //Sent Mail fetching for to Address

    try {
      const response = await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${toRegexEmail}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify({
            fromEmail: localEmail,
            toEmail: toEmail,
            subject: subject,
            message: message,
            timeStamp: timeStamp,
            read: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Send Mail Part 1", data);
    } catch (error) {
      console.log(error);
    }

    //Inbox Mail fetching from Address

    try {
      const response = await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${fromRegexEmail}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify({
            fromEmail: localEmail,
            toEmail: toEmail,
            subject: subject,
            message: message,
            timeStamp: timeStamp,
            read: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Send Mail Part 2", data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMailsAction = (regexEmail) => {
  console.log("getMailsAction");
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}.json`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      const inbox = data.inbox;
      let inboxMails = [];
      if (!!inbox) {
        inboxMails = Object.keys(inbox).map((mail) => {
          return {
            fromEmail: inbox[mail].fromEmail,
            toEmail: inbox[mail].toEmail,
            subject: inbox[mail].subject,
            message: inbox[mail].message,
            timeStamp: inbox[mail].timeStamp,
            read: inbox[mail].read,
            id: mail,
          };
        });
      }

      const sent = data.sent;
      let sentMails = [];
      if (!!sent) {
        sentMails = Object.keys(sent).map((mail) => {
          return {
            fromEmail: sent[mail].fromEmail,
            toEmail: sent[mail].toEmail,
            subject: sent[mail].subject,
            message: sent[mail].message,
            timeStamp: sent[mail].timeStamp,
            read: sent[mail].read,
            id: mail,
          };
        });
      }
      dispatch(EmailActions.setInbox(inboxMails));
      dispatch(EmailActions.setSent(sentMails));
    } catch (error) {
      console.log(error);
    }
  };
};

export const inboxMailReadFetching = (regexEmail, mail) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}/inbox/${mail.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...mail,
            read: true,
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
};

export const sentMailReadFetching = (regexEmail, mail) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}/sent/${mail.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...mail,
            read: true,
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
};

export const deleteInboxMailFetching = (regexEmail, id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}/inbox/${id}.json`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteSentMailFetching = (regexEmail, id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}/sent/${id}.json`,
        {
          method: "DELETE",
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
};
