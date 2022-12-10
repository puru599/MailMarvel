import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComposeEmail from "../ComposeEmail/ComposeEmail";
import classes from "./MailHome.module.css";
import {
  deleteInboxMailFetching,
  deleteSentMailFetching,
  getMailsAction,
  inboxMailReadFetching,
  sentMailReadFetching,
} from "../../../Store/ActionCreators/EmailActions";
import Button from "../../../Layout/UI/Button";
import { useState } from "react";
import { EmailActions } from "../../../Store/ReduxSlices/EmailSlice";
import { Link } from "react-router-dom";

const MailHome = () => {
  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);
  const regexEmail = useSelector((state) => state.auth.regexEmail);
  const inbox = useSelector((state) => state.email.inbox);
  const sent = useSelector((state) => state.email.sent);

  // setInterval(() => {
  //   console.log("Fetching");
  // }, 2000);

  const countOfUnread = inbox.reduce((curNum, mail) => {
    return (mail.read === false) + curNum;
  }, 0);

  const [composeEmailState, setComposeEmailState] = useState(false);
  const composeEmailHandler = () => {
    setComposeEmailState((composeEmailState) => {
      return !composeEmailState;
    });
  };

  const inboxMailClickHandler = (id) => {
    dispatch(EmailActions.inboxMailRead(id));
    const mail = inbox.find((mail) => {
      return mail.id === id;
    });
    dispatch(inboxMailReadFetching(regexEmail, mail));
  };

  const sentMailClickHandler = (id) => {
    dispatch(EmailActions.sentMailRead(id));
    const mail = sent.find((mail) => {
      return mail.id === id;
    });
    dispatch(sentMailReadFetching(regexEmail, mail));
  };

  const deleteInboxMailHandler = (id) => {
    dispatch(EmailActions.inboxMailDelete(id));
    dispatch(deleteInboxMailFetching(regexEmail, id));
  };

  const deleteSentMailHandler = (id) => {
    dispatch(EmailActions.sentMailDelete(id));
    dispatch(deleteSentMailFetching(regexEmail, id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getMailsAction(regexEmail));
    }, 2000);
    return () => clearInterval(interval);
  }, [dispatch, regexEmail]);

  useEffect(() => {
    dispatch(getMailsAction(regexEmail));
  }, [dispatch, regexEmail]);

  return (
    <React.Fragment>
      <Button onClick={composeEmailHandler}>Compose</Button>
      <h1>{email}</h1>
      <div>
        <h3>Inbox {countOfUnread} </h3>
        <ul>
          {inbox.map((mail) => (
            <li key={mail.toEmail + "" + mail.subject}>
              <div
                onClick={inboxMailClickHandler.bind(null, mail.id)}
                className={classes.Mails}
              >
                {!!mail.read ? <span>read</span> : <span>Unread</span>}
                <span>{mail.toEmail}</span>
                <span>{mail.subject}</span>
                <span>{mail.timeStamp}</span>
              </div>
              <Button onClick={deleteInboxMailHandler.bind(null, mail.id)}>
                Del
              </Button>
              <Link to={`/MailHome/${mail.id}`}>Expand</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Sent</h3>
        <ul>
          {sent.map((mail) => (
            <li key={mail.toEmail + "" + mail.subject}>
              <div
                onClick={sentMailClickHandler.bind(null, mail.id)}
                className={classes.Mails}
              >
                {!!mail.read ? <span>read</span> : <span>Unread</span>}
                <span>{mail.toEmail}</span>
                <span>{mail.subject}</span>
                <span>{mail.timeStamp}</span>
              </div>
              <Button onClick={deleteSentMailHandler.bind(null, mail.id)}>
                Del
              </Button>
              <Link to={`/MailHome/${mail.id}`}>Expand</Link>
            </li>
          ))}
        </ul>
      </div>
      {composeEmailState && <ComposeEmail />}
    </React.Fragment>
  );
};

export default MailHome;
