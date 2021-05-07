import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import "./components/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "./actions/index";
//import authReducer from "./reducers";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedIn());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
