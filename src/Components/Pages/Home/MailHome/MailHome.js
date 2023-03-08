import React from "react";
import ComposeEmail from "../ComposeEmail/ComposeEmail";
import { useState } from "react";
import InboxMails from "../InboxMails/InboxMails";
import SentMails from "../SentMails/SentMails";
import HeaderSideBar from "../SideBar/Header&SideBar";
import classes from "./MailHome.module.css";
import MailExpand from "../MailExpand/MailExpand";
import { Route } from "react-router-dom";
import background from "../../../../Assets/background6.jpg";

const MailHome = () => {

  const [composeEmailState, setComposeEmailState] = useState(false);
  const [inboxEmailState, setInboxEmailState] = useState(true);
  const [sentEmailState, setSentEmailState] = useState(false);
  const [mailExpandState, setMailExpandState] = useState(false);

  const composeEmailHandler = () => {
    setComposeEmailState(true);
  };
  const closeComposeMailHandler = () => {
    setComposeEmailState(false);
  };

  const inboxEmailHandler = () => {
    setInboxEmailState(true);
    setSentEmailState(false);
    setMailExpandState(false);
  };

  const sentEmailHandler = () => {
    setSentEmailState(true);
    setInboxEmailState(false);
    setMailExpandState(false);
  };

  const closeMenuHandler = () => {
    setSentEmailState(false);
    setInboxEmailState(false);
    setMailExpandState(true);
  };

  const openMailsHandler = (boolean) => {
    if (boolean) {
      setInboxEmailState(true);
    } else {
      setSentEmailState(true);
    }
  };


  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        position: "inherit",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <HeaderSideBar
        composeEmailHandler={composeEmailHandler}
        inboxEmailHandler={inboxEmailHandler}
        sentEmailHandler={sentEmailHandler}
      />
      <div className={classes.body}>
        {inboxEmailState && <InboxMails closeMenu={closeMenuHandler} />}
        {sentEmailState && <SentMails closeMenu={closeMenuHandler} />}
        {mailExpandState && (
          <Route path="/MailHome/:mailId">
            <MailExpand openMails={openMailsHandler} />
          </Route>
        )}
      </div>
      {composeEmailState && (
        <ComposeEmail closeComposeMailHandler={closeComposeMailHandler} />
      )}
    </div>
  );
};

export default MailHome;
