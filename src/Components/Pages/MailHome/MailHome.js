import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from "./MailHome.module.css";
import { EditorState } from "draft-js";
import React from "react";
import { useState } from "react";
import Button from "../../Layout/UI/Button";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { SendEmailAction } from "../../Store/ActionCreators/EmailActions";

const MailHome = () => {
  const toEmailRef = useRef("");
  const subjectRef = useRef("");

  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editorStateChangeHandler = (editorState) => {
    setEditorState(editorState);
  };

  const sendEmailHandler = (event) => {
    event.preventDefault();
    const fromEmail = "exampleEmail@email.com";
    const idToken = "idToken";
    const toEmail = toEmailRef.current.value;
    const subject = subjectRef.current.value;
    const message = editorState.getCurrentContent().getPlainText();
    dispatch(SendEmailAction(fromEmail, idToken, toEmail, subject, message));
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
        <input type="text" placeholder="To:" ref={toEmailRef}></input>
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

export default MailHome;
