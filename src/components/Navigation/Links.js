import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    width: '250px',
  },
});

function Navigation() {
  const classes = useStyles();
  return <div className={classes.root}>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
};

const NavigationAuth = () => (
  <List>
    <ListItem button to={ROUTES.LANDING} component={Link}>
      <ListItemText primary="Landing"/>
    </ListItem>
    <ListItem button to={ROUTES.HOME} component={Link}>
      <ListItemText primary="Home"/>
    </ListItem>
    <ListItem button to={ROUTES.ACCOUNT} component={Link}>
      <ListItemText primary="Account"/>
    </ListItem>
    <ListItem button to={ROUTES.ADMIN} component={Link}>
      <ListItemText primary="Admin"/>
    </ListItem>
    <SignOutButton/>
  </List>
);

const NavigationNonAuth = () => (
  <List>
    <ListItem button to={ROUTES.LANDING} component={Link}>
    <ListItemIcon><HomeIcon /></ListItemIcon>
      <ListItemText primary="Landing"/>
    </ListItem>
    <ListItem button to={ROUTES.SIGN_IN} component={Link}>
      <ListItemIcon><FaceIcon /></ListItemIcon>
      <ListItemText primary="Sign In"/>
    </ListItem>
  </List>
);

export default Navigation;