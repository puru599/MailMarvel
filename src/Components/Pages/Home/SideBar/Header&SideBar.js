import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthActions } from "../../../Store/ReduxSlices/AuthSlice";
import classes from "./Header&SideBar.module.css";

const HeaderSideBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const logoutHandler = () => {
    dispatch(AuthActions.logout());
    history.replace("/SignIn");
  };

  const inbox = useSelector((state) => state.email.inbox);

  const countOfUnread = inbox.reduce((curNum, mail) => {
    return (mail.read === false) + curNum;
  }, 0);

  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src={require("../../../../Assets/menu.png")} alt="menu" />
          <img src={require("../../../../Assets/logo2.png")} alt="Logo" />
        </div>
        <div className={classes.SearchBar}>
          <img src={require("../../../../Assets/svg/search.png")} alt=" "></img>
          <input placeholder="Search mail"></input>
          <img src={require("../../../../Assets/svg/slider.png")} alt=" "></img>
        </div>
        <div>
          <img src={require("../../../../Assets/svg/help.png")} alt="" />
          <img
            src={require("../../../../Assets/svg/settings2.png")}
            alt="setting"
          />
          <img
            src={require("../../../../Assets/svg/circled-menu.png")}
            alt="menu"
          />
          <img
            src={require("../../../../Assets/svg/logout.png")}
            alt="logout"
            onClick={logoutHandler}
          />
          <img
            src={require("../../../../Assets/svg/profile.jpg")}
            alt="profile"
            style={{ borderRadius: "100%" }}
          />
        </div>
      </header>
      <header className={classes.sidebar}>
        <div className={classes.ComposeButton}>
          <button onClick={props.composeEmailHandler} >
            <span>
              <img
                src={require("../../../../Assets/svg/compose.png")}
                alt=" "
              />
            </span>
            Compose
          </button>
        </div>
        <div className={classes.Menu}>
          <button onClick={props.inboxEmailHandler}>
            <span>
              <img src={require("../../../../Assets/svg/inbox.png")} alt=" " />
            </span>
            Inbox {countOfUnread}
          </button>
          <button onClick={props.sentEmailHandler}>
            <span>
              <img src={require("../../../../Assets/svg/sent.png")} alt=" " />
            </span>
            Sent
          </button>
          <button>
            <span>
              <img src={require("../../../../Assets/svg/draft.png")} alt=" " />
            </span>
            Draft
          </button>
          <button>
            <span>
              <img src={require("../../../../Assets/svg/star.png")} alt=" " />
            </span>
            Starred
          </button>
          <button>
            <span>
              <img src={require("../../../../Assets/svg/time.png")} alt=" " />
            </span>
            Snoozed
          </button>
          <button>
            <span>
              <img
                src={require("../../../../Assets/svg/down-arrow.png")}
                alt=" "
              />
            </span>
            More
          </button>
        </div>
      </header>
      <header className={classes.rightbar}>
        <img
          src={require("../../../../Assets/svg/calendar.png")}
          alt="calendar"
        />
        <img src={require("../../../../Assets/svg/keep.png")} alt="keep" />
        <img src={require("../../../../Assets/svg/plus.png")} alt="plus" />
      </header>
    </React.Fragment>
  );
};

export default HeaderSideBar;
