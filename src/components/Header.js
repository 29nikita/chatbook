import { NavLink, Link } from "react-router-dom";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/index";
//import rootReducer from "../reducers/index";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  //const name = useSelector((state) => state.name);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div style={{ display: "flex" }}>
        <div className="logo">ChatBook</div>

        {!auth.authenticated ? (
          <ul className="leftMenu">
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li>
              <NavLink to={"/register"}>Sign Up</NavLink>
            </li>
          </ul>
        ) : null}
      </div>
      <div style={{ margin: "20px 0", color: "black", fontWeight: "bold" }}>
        {auth.authenticated ? `Hi! ${auth.name}` : ""}
      </div>
      <ul className="menu">
        {auth.authenticated ? (
          <li>
            <Link to={"#"} onClick={() => dispatch(logout(auth.uid))}>
              Logout
            </Link>
          </li>
        ) : null}
      </ul>
    </header>
  );
};

export default Header;
