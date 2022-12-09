import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComposeEmail from "../ComposeEmail/ComposeEmail";
import classes from "./MailHome.module.css";
import { getInboxAction } from "../../../Store/ActionCreators/EmailActions";

const MailHome = () => {
  const dispatch = useDispatch();
  const regexEmail = useSelector((state) => state.auth.regexEmail);
  const inbox = useSelector((state) => state.email.inbox);
  console.log(inbox);
  useEffect(() => {
    dispatch(getInboxAction(regexEmail));
  }, []);

  return (
    <div>
      <ul className={classes.Mails}>
        {inbox.map((mail) => (
          <li key={mail.toEmail + "" + mail.subject}>
            <div>
              <span>{mail.toEmail}</span>
            </div>
            <div>
              <span>{mail.subject}</span>
            </div>
            <div>
              <span>{mail.timeStamp}</span>
            </div>
          </li>
        ))}
      </ul>
      <ComposeEmail />
    </div>
  );
};

export default MailHome;
