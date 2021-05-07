import Layout from "./Layout";
import { useState } from "react";
import {
  Typography,
  Paper,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter, Redirect } from "react-router-dom";
import { signin } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
//import rootReducer from "../reducers/index";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

const Login = (props) => {
  const { classes } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userLogin = (e) => {
    e.preventDefault();

    dispatch(signin({ email, password }));
  };

  if (auth.authenticated) {
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <Layout />
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={userLogin}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="off"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign in
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              component={Link}
              to="/register"
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        </Paper>
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            marginTop: "1rem",
          }}
        >
          <h4>Test Credentials</h4>
          <p>Username: nikita@gmail.com , daksh@gmail.com</p>
          <p>Password: 123456</p>
        </div>
      </main>
    </div>
  );
};

export default withRouter(withStyles(styles)(Login));
