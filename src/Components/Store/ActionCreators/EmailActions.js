import { EmailActions } from "../ReduxSlices/EmailSlice";

export const SendEmailAction = (
  localEmail,
  regexEmail,
  fromIdToken,
  toEmail,
  subject,
  message,
  timeStamp
) => {
  return async () => {
    try {
      const response = await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            fromEmail: localEmail,
            fromIdToken: fromIdToken,
            toEmail: toEmail,
            subject: subject,
            message: message,
            timeStamp: timeStamp,
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

export const getInboxAction = (regexEmail) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://react-mail-box-client-default-rtdb.firebaseio.com/${regexEmail}.json`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      let inboxMails = [];
      if (!!data) {
        inboxMails = Object.keys(data).map((mail) => {
          return {
            fromEmail: data[mail].fromEmail,
            toEmail: data[mail].toEmail,
            subject: data[mail].subject,
            message: data[mail].message,
            timeStamp: data[mail].timeStamp,
          };
        });
      }
      dispatch(EmailActions.setInbox(inboxMails));
    } catch (error) {
      console.log(error);
    }
  };
};
