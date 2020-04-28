import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';

// Style imports
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
  formBox: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AccountPage() {
  const classes = useStyles();

  return <AuthUserContext.Consumer>
  {authUser => (
  <div>
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        Account: {authUser.email}
        </Typography>
        <Grid container spacing={3} direction="row" className={classes.formBox}
          justify="space-around"
          alignItems="center">
            <Grid item xs>
            <Typography component="h1" variant="h5">
              Forgot password ?
            </Typography>
            <PasswordForgetForm />
            </Grid>
            <Grid item xs>
              <Typography component="h1" variant="h5">
                Change Password
              </Typography>
              <PasswordChangeForm />
            </Grid>
          </Grid>
      </div>
    </Container>
  </div>)}
  </AuthUserContext.Consumer>
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage)