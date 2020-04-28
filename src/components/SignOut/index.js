import React from 'react';
import { withFirebase } from '../Firebase';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SignOutButton = ({ firebase }) => (
  <ListItem button onClick={firebase.doSignOut}>
    <ListItemText primary="Sign Out"/>
  </ListItem>
);
export default withFirebase(SignOutButton);