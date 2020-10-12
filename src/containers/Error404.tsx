import { Typography, Link, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import Auto1Logo from '../images/logo.png';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 'min-content',
    marginBottom: 24,
  },
  header: {
    fontWeight: 'bold',
  },
});

const Error404 = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="sm">
      <img src={Auto1Logo} alt="Auto1 Logo" className={classes.image} />
      <Typography variant="h3" className={classes.header} gutterBottom>
        404 - Not Found
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Sorry, the page you are looking for does not exists.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        You can always go back to the{' '}
        <Link color="inherit" component={RouterLink} to="/">
          homepage
        </Link>
        .
      </Typography>
    </Container>
  );
};

export default Error404;
