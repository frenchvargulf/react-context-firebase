import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function SignUpPage() {
  const classes = useStyles();
  return <div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      <SignUpForm />
      </div>
    </Container>
  </div>
};

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <SignUp 
        onSubmit={this.onSubmit} 
        onChange={this.onChange} 
        email={email} 
        username={username}
        passwordOne={passwordOne}
        passwordTwo={passwordTwo}
        isInvalid={isInvalid} 
        error={error}
      />
    );
  }
  
}

function SignUp(props) {
  const classes = useStyles();

  return (
        <form className={classes.form} onSubmit={props.onSubmit} noValidate autoComplete="off">
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            // id="email"
            // label="Email Address"
            // name="email"
            // autoComplete="email"
            autoFocus
            // value={props.email}
            // onChange={props.onChange}
            // type="text"
            // placeholder="Email Address"
            name="username"
            value={props.username}
            onChange={props.onChange}
            type="text"
            placeholder="Full Name"
          />
          <TextField
            value={props.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={props.onChange}
            type="text"
            placeholder="Email Address"
          />        
          <TextField
            name="passwordOne"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="passwordOne"
            autoComplete="current-password"
            value={props.passwordOne}
            onChange={props.onChange}
            placeholder="Password"
          />
          <TextField
            name="passwordTwo"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="passwordTwo"
            autoComplete="current-password"
            value={props.passwordTwo}
            onChange={props.onChange}
            placeholder="Confirm Password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={props.isInvalid}
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {props.error && <p>{props.error.message}</p>}
        </form>
  );
}

const SignUpLink = () => (
  <p>
    <ListItem to={ROUTES.SIGN_UP} component={Link} variant="body2">
      <ListItemText primary="Don't have an account? Sign up"/>
    </ListItem>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };