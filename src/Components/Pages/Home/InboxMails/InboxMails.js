import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInboxMailFetching,
  getInboxMailsAction,
  inboxMailReadFetching,
} from "../../../Store/ActionCreators/EmailActions";
import { EmailActions } from "../../../Store/ReduxSlices/EmailSlice";
import classes from "./InboxMails.module.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const InboxMails = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const regexEmail = useSelector((state) => state.auth.regexEmail);
  const inbox = useSelector((state) => state.email.inbox);

  const countOfUnread = inbox.reduce((curNum, mail) => {
    return (mail.read === false) + curNum;
  }, 0);

  const inboxMailClickHandler = (id) => {
    dispatch(EmailActions.inboxMailRead({ id: id, bool: false }));
    history.replace(`/MailHome/${id}`);
    const mail = inbox.find((mail) => {
      return mail.id === id;
    });
    dispatch(inboxMailReadFetching(regexEmail, mail, true));
    props.closeMenu();
  };

  const deleteInboxMailHandler = (id) => {
    dispatch(EmailActions.inboxMailDelete(id));
    dispatch(deleteInboxMailFetching(regexEmail, id));
  };

  const unreadInboxMailHandler = (id) => {
    dispatch(EmailActions.inboxMailRead({ id: id, bool: false }));
    const mail = inbox.find((mail) => {
      return mail.id === id;
    });
    dispatch(inboxMailReadFetching(regexEmail, mail, false));
  };

  const refreshEmailHandler = () => {
    dispatch(getInboxMailsAction(regexEmail));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getInboxMailsAction(regexEmail));
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch, regexEmail]);

  useEffect(() => {
    dispatch(getInboxMailsAction(regexEmail));
  }, [dispatch, regexEmail]);

  return (
    <React.Fragment>
      <div className={classes.MailHomeHeader}>
        <div>
          <img
            src={require("../../../../Assets/svg/refresh.png")}
            alt="refresh"
            onClick={refreshEmailHandler}
          />
          <img
            src={require("../../../../Assets/svg/dot-menu.png")}
            alt="dot-menu"
          />
        </div>
        <h3>
          Inbox {countOfUnread} of {inbox.length}{" "}
        </h3>
      </div>
      {inbox.map((mail) => (
        <button
          key={mail.toEmail + "" + mail.subject}
          className={classes.mails}
        >
          <div>
            {!!mail.read ? (
              <img src={require("../../../../Assets/svg/read.png")} alt="box" />
            ) : (
              <img src={require("../../../../Assets/svg/box.png")} alt="box" />
            )}
            <img src={require("../../../../Assets/svg/star2.png")} alt="star" />
          </div>
          <div
            onClick={inboxMailClickHandler.bind(null, mail.id)}
            className={classes.Mails}
          >
            <span>{mail.fromEmail}</span>
          </div>
          <span
            onClick={inboxMailClickHandler.bind(null, mail.id)}
            className={classes.subject}
          >
            {mail.subject}
          </span>
          <span
            onClick={inboxMailClickHandler.bind(null, mail.id)}
            className={classes.timeStamp}
          >
            {mail.timeStamp}
          </span>
          <div className={classes.end}>
            <img
              src={require("../../../../Assets/svg/trash.png")}
              alt="refresh"
              onClick={deleteInboxMailHandler.bind(null, mail.id)}
            />
            <img
              src={require("../../../../Assets/svg/unread.png")}
              alt="refresh"
              onClick={unreadInboxMailHandler.bind(null, mail.id)}
            />
          </div>
        </button>
      ))}
    </React.Fragment>
  );
};

export default InboxMails;
