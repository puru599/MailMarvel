import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { AuthActions } from "../../Store/ReduxSlices/AuthSlice";
import Button from "../UI/Button";
import classes from "./Header.module.css";

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
      <h2>Mail Box</h2>
      {!isLoggedIn && (
        <div>
          <Link to="/SignIn">Sign In</Link>
          <Link to="/SignUp">Sign Up</Link>
        </div>
      )}
      {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
    </header>
  );
};

export default Header;
