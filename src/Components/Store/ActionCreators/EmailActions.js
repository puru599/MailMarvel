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
  return async () => {
    //Send Mails Action
    try {
      await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${toRegexEmail}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify({
            fromEmail: localEmail,
            toEmail: toEmail,
            subject: subject,
            message: message,
            timeStamp: timeStamp,
            read: false
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    } catch (error) {
      console.log(error);
    }

    //Inbox Mail fetching from Address

    try {
      await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${fromRegexEmail}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify({
            fromEmail: localEmail,
            toEmail: toEmail,
            subject: subject,
            message: message,
            timeStamp: timeStamp,
            read: false
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const getInboxMailsAction = (regexEmail) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}/inbox.json`,
        {
          method: "GET"
        }
      );
      if (response.ok) {
        const data = await response.json();
        const inbox = data;
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
              id: mail
            };
          });
        }
        dispatch(EmailActions.setInbox(inboxMails));
      } else {
        throw new Error("Error occured while fetching inbox...");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSentMailsAction = (regexEmail) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}/sent.json`,
        {
          method: "GET"
        }
      );
      if (response.ok) {
        const data = await response.json();
        const sent = data;
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
              id: mail
            };
          });
        }
        dispatch(EmailActions.setSent(sentMails));
      } else {
        throw new Error("Error occured while fetching sent mails...");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const inboxMailReadFetching = (regexEmail, mail, bool) => {
  return async () => {
    try {
      await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}/inbox/${mail.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...mail,
            read: bool
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const sentMailReadFetching = (regexEmail, mail, bool) => {
  return async () => {
    try {
      await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}/sent/${mail.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...mail,
            read: bool
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteInboxMailFetching = (regexEmail, id) => {
  return async () => {
    try {
      await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}/inbox/${id}.json`,
        {
          method: "DELETE"
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteSentMailFetching = (regexEmail, id) => {
  return async () => {
    try {
      await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}/sent/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};
