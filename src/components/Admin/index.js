import React, { Component } from 'react';
import CircularIndeterminate from './Loader';
import { withAuthorization } from '../Session';

// Style imports
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase
      .users()
      .on('value', snapshot => {
      const usersObject = snapshot.val();
      console.log(snapshot)
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      })
      
      );
    
      console.log(usersList);
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs>
              <Typography component="h1" variant="h5">
                Admin
              </Typography>
            </Grid>
            <Grid item xs>
              {loading && <CircularIndeterminate />}
              <UserList users={users} />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <List>
    {users.map(user => (
      <ListItem key={user.uid}>
          <div>
          <ListItemText>
            <strong>ID:</strong> {user.uid}
            </ListItemText>
          </div>
          <div>
          <ListItemText>
            <strong>E-Mail:</strong> {user.email}
            </ListItemText>
          </div>
          <div>
            <ListItemText>
              <strong>Username:</strong> {user.userName}
            </ListItemText>
          </div>
      </ListItem>
    ))}
  </List>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AdminPage)