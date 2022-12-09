import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MailExpand = () => {
  const params = useParams();
  const mailId = params.mailId;
  const inbox = useSelector((state) => state.email.inbox);
  const sent = useSelector((state) => state.email.sent);
  const inboxMail = inbox.find((mail) => {
    return mailId === mail.id;
  });
  console.log(inboxMail);
  const sentMail = sent.find((mail) => {
    return mailId === mail.id;
  });
  console.log(sentMail);
  let showMail;
  if (!!sentMail) {
    showMail = sentMail;
    console.log(showMail);
  }
  if (!!inboxMail) {
    showMail = inboxMail;
    console.log(showMail);
  }

  return (
    <div>
      <h1>Mail Expand</h1>
      <h2>From: {showMail.fromEmail}</h2>
      <h3>To: {showMail.toEmail}</h3>
      <h4>Subject: {showMail.subject}</h4>
      <h5>Message: {showMail.message}</h5>
    </div>
  );
};

export default MailExpand;
