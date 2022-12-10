import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getMailsAction } from "../../../Store/ActionCreators/EmailActions";

const MailExpand = () => {
  const params = useParams();
  const mailId = params.mailId;
  const inbox = useSelector((state) => state.email.inbox);
  const sent = useSelector((state) => state.email.sent);
  const regexEmail = useSelector((state) => state.auth.regexEmail);
  const dispatch = useDispatch();
  const inboxMail = inbox.find((mail) => {
    return mailId === mail.id;
  });
  useEffect(() => {
    dispatch(getMailsAction(regexEmail));
  }, [dispatch, regexEmail]);

  console.log(inboxMail);
  const sentMail = sent.find((mail) => {
    return mailId === mail.id;
  });
  let showMail;
  if (!!sentMail) {
    showMail = sentMail;
  }
  if (!!inboxMail) {
    showMail = inboxMail;
  }

  return (
    <React.Fragment>
      <Link to="/MailHome">Back</Link>
      <div>
        <h1>Mail Expand</h1>
        <h2>From: {showMail.fromEmail}</h2>
        <h3>To: {showMail.toEmail}</h3>
        <h4>Subject: {showMail.subject}</h4>
        <h5>Message: {showMail.message}</h5>
      </div>
    </React.Fragment>
  );
};

export default MailExpand;
