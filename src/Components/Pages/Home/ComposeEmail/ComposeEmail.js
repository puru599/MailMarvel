import { Editor } from "react-draft-wysiwyg";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from "./ComposeEmail.module.css";
import { EditorState } from "draft-js";
import React from "react";
import { useState } from "react";
import Button from "../../../Layout/UI/Button";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendEmailAction } from "../../../Store/ActionCreators/EmailActions";

const ComposeEmail = () => {
  const toEmailRef = useRef("");
  const subjectRef = useRef("");

  const dispatch = useDispatch();

  const localEmail = useSelector((state) => state.auth.email);
  const fromRegexEmail = useSelector((state) => state.auth.regexEmail);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editorStateChangeHandler = (editorState) => {
    setEditorState(editorState);
  };

  const sendEmailHandler = (event) => {
    event.preventDefault();
    const toEmail = toEmailRef.current.value;
    const subject = subjectRef.current.value;
    const message = editorState.getCurrentContent().getPlainText();

    const regex = /[.@]/g;
    const toRegexEmail = toEmail.replace(regex, "");

    const date = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const timeStamp =
      months[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear() +
      ", " +
      date.getHours() +
      ":" +
      date.getMinutes();

    dispatch(
      SendEmailAction(
        localEmail,
        fromRegexEmail,
        toRegexEmail,
        toEmail,
        subject,
        message,
        timeStamp
      )
    );
    toEmailRef.current.value = "";
    subjectRef.current.value = "";
    setEditorState(() => EditorState.createEmpty());
  };

  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={sendEmailHandler}>
        <div className={classes.FormHeader}>
          <span>New Message</span>
          <div>
            <button>_</button>
            <button>x</button>
          </div>
        </div>
        <input
          id="emailId"
          type="text"
          placeholder="To:"
          ref={toEmailRef}
        ></input>
        <input type="text" placeholder="Subject" ref={subjectRef}></input>
        <Editor
          editorState={editorState}
          wrapperClassName={classes["Editor"]}
          editorClassName="demo-editor"
          toolbarClassName={classes["Toolbar"]}
          onEditorStateChange={editorStateChangeHandler}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
        <Button type="Submit">Send</Button>
      </form>
    </React.Fragment>
  );
};

export default ComposeEmail;
