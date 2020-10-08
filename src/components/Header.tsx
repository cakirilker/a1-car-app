import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Theme,
  Link,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Auto1Logo from '../images/logo.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: '#fff',
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
      textTransform: 'none',
      '&:hover': {
        color: '#EA7F28',
      },
      '&.active': {
        color: '#EA7F28',
      },
    },
    brandImage: {
      margin: '10px 0',
    },
  }),
);

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          <NavLink to="/">
            <img
              src={Auto1Logo}
              alt="Auto1 Logo"
              className={classes.brandImage}
            />
          </NavLink>
        </Typography>

        <nav>
          <Link
            variant="button"
            color="textPrimary"
            className={classes.link}
            component={NavLink}
            to="/purchase"
          >
            Purchase
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            className={classes.link}
            component={NavLink}
            to="/orders"
          >
            My Orders
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            className={classes.link}
            component={NavLink}
            to="/sell"
          >
            Sell
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
