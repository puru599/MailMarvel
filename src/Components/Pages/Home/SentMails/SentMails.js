import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSentMailFetching,
  getSentMailsAction,
  sentMailReadFetching,
} from "../../../Store/ActionCreators/EmailActions";
import { EmailActions } from "../../../Store/ReduxSlices/EmailSlice";
import classes from "./SentMails.module.css";
import { useEffect } from "react";

const SentMails = (props) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const regexEmail = useSelector((state) => state.auth.regexEmail);
  const sent = useSelector((state) => state.email.sent);

  const sentMailClickHandler = (id) => {
    dispatch(EmailActions.sentMailRead({ id: id, bool: true }));
    history.replace(`/MailHome/${id}`);
    props.closeMenu();
    const mail = sent.find((mail) => {
      return mail.id === id;
    });
    dispatch(sentMailReadFetching(regexEmail, mail, true));
  };

  const unreadSentMailHandler = (id) => {
    dispatch(EmailActions.sentMailRead({ id: id, bool: false }));
    const mail = sent.find((mail) => {
      return mail.id === id;
    });
    dispatch(sentMailReadFetching(regexEmail, mail, false));
  };

  const deleteSentMailHandler = (id) => {
    dispatch(EmailActions.sentMailDelete(id));
    dispatch(deleteSentMailFetching(regexEmail, id));
  };

  const refreshEmailHandler = () => {
    console.log("Refresh");
    dispatch(getSentMailsAction(regexEmail));
  };

  useEffect(() => {
    dispatch(getSentMailsAction(regexEmail));
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
        <h3>Sent {sent.length} </h3>
      </div>
      {sent.map((mail) => (
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
            onClick={sentMailClickHandler.bind(null, mail.id)}
            className={classes.Mails}
          >
            <span>{mail.toEmail}</span>
          </div>
          <span className={classes.subject}>{mail.subject}</span>
          <span className={classes.timeStamp}>{mail.timeStamp}</span>
          <div className={classes.end}>
            <img
              src={require("../../../../Assets/svg/trash.png")}
              alt="refresh"
              onClick={deleteSentMailHandler.bind(null, mail.id)}
            />
            <img
              src={require("../../../../Assets/svg/unread.png")}
              alt="refresh"
              onClick={unreadSentMailHandler.bind(null, mail.id)}
            />
          </div>
        </button>
      ))}
    </React.Fragment>
  );
};

export default SentMails;
