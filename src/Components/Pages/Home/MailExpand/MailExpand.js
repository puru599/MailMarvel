import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import classes from "./MailExpand.module.css";

const MailExpand = (props) => {
  const params = useParams();
  const history = useHistory();
  const mailId = params.mailId;

  const [showMail, setShowMail] = useState([]);

  const inbox = useSelector((state) => state.email.inbox);
  const sent = useSelector((state) => state.email.sent);

  const inboxMail = inbox.find((mail) => {
    return mailId === mail.id;
  });

  const sentMail = sent.find((mail) => {
    return mailId === mail.id;
  });
  useEffect(() => {
    if (!!inboxMail) {
      setShowMail(inboxMail);
    }
    if (!!sentMail) {
      setShowMail(sentMail);
    }
  }, [inboxMail, sentMail]);

  const backHandler = () => {
    history.replace("/MailHome");
    if (!!inboxMail) {
      props.openMails(true);
    }
    if (!!sentMail) {
      props.openMails(false);
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <img
          src={require("../../../../Assets/svg/back.png")}
          alt="back"
          onClick={backHandler}
        />
        <img
          src={require("../../../../Assets/svg/refresh.png")}
          alt="refresh"
        />
        <img
          src={require("../../../../Assets/svg/dot-menu.png")}
          alt="dot-menu"
        />
      </div>
      <div className={classes.MailExpand}>
        <h1>{showMail.subject}</h1>
        <div className={classes.profile}>
          <div>
            <img
              src={require("../../../../Assets/svg/profile.jpg")}
              alt="profile"
            />
            <h3>{showMail.fromEmail}</h3>
          </div>
          <div>
            <span>{showMail.timeStamp}</span>
            <img
              src={require("../../../../Assets/svg/black-star.png")}
              alt="star"
            />
            <img
              src={require("../../../../Assets/svg/dot-menu.png")}
              alt="dot-menu"
            />
          </div>
        </div>
        <p>{showMail.message}</p>
      </div>
    </div>
  );
};

export default MailExpand;
