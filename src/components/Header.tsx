import React from 'react';
import {
  AppBar,
  Toolbar,
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
    },
    link: {
      margin: theme.spacing(1, 1.5),
      color: theme.palette.text.primary,
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
      color="inherit"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar>
        <NavLink to="/" style={{ flexGrow: 1 }}>
          <img
            src={Auto1Logo}
            alt="Auto1 Logo"
            className={classes.brandImage}
          />
        </NavLink>
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
