import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
    
    return (
      <PasswordChange
        onSubmit={this.onSubmit}
        onChange={this.onChange} 
        passwordOne={passwordOne}
        passwordTwo={passwordTwo}
        isInvalid={isInvalid} 
        error={error}
      />
    );
  }
}

function PasswordChange(props) {
  const classes = useStyles();
  return (
    <form className={classes.form} onSubmit={props.onSubmit} noValidate autoComplete="off">
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
            placeholder="New Password"
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
            value={props.passwordOne}
            onChange={props.onChange}
            placeholder="Confirm New Password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={props.isInvalid}
            color="primary"
            className={classes.submit}
          >
            Change My Password
          </Button>
          {props.error && <p>{props.error.message}</p>}
        </form>
  );
}
export default withFirebase(PasswordChangeForm);