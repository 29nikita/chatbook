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
import { signup } from "../actions/index";
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

const Register = (props) => {
  const { classes } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const registerUser = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };

    dispatch(signup(user));
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
            Register Account
          </Typography>
          <form className={classes.form} onSubmit={registerUser}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                autoComplete="off"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password should be of 6 characters"
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Register
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              component={Link}
              to="/login"
              className={classes.submit}
            >
              Go back to Login
            </Button>
          </form>
        </Paper>
      </main>
    </div>
  );
};

export default withRouter(withStyles(styles)(Register));
