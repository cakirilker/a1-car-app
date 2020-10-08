import React from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      © AUTO1 Group 2020
    </Typography>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      padding: theme.spacing(2),
      height: 80,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Copyright />
    </footer>
  );
};

export default Footer;
