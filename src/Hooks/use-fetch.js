import { useDispatch } from "react-redux";
import { EmailActions } from "../Components/Store/ReduxSlices/EmailSlice";

const useFetch = async (regexEmail) => {
  const dispatch = useDispatch();
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

export default useFetch;
