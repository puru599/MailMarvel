import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { AuthActions } from "../../Store/ReduxSlices/AuthSlice";
import Button from "../UI/Button";
import classes from "./Header.module.css";
import logo2 from "../../../Assets/logo2.png";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(AuthActions.logout());
    history.replace("/SignIn");
  };
  return (
    <header className={classes.Header}>
      {isLoggedIn && <Button>Menu</Button>}
      <img src={logo2} alt="logo" />
      {!isLoggedIn && (
        <div>
          <Link to="/SignIn" className={classes.Link}>
            Sign In
          </Link>
          <Link to="/SignUp" className={classes.Link2}>
            Create an account
          </Link>
        </div>
      )}
      {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
    </header>
  );
};

export default Header;
