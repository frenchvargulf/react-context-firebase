import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Navigation from './Links';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


export default function NavDrawer() {
  const anchor = 'left';
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (
    event
  ) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' ||
        event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
        <React.Fragment key={anchor}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" onClick={toggleDrawer(anchor, true)} className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                React Context Firebase
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <Navigation 
              role="presentation"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            />
          </Drawer>
        </React.Fragment>
    </div>
  );
}
