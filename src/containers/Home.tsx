import React from 'react';
import { CarList, Filters } from '../components';
import {
  Grid,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  Container,
} from '@material-ui/core';
import './Home.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
    },
  }),
);

const Home = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <Paper variant="outlined" square>
            <Filters />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Paper
            className="car-list-container"
            variant="elevation"
            elevation={0}
            square
          >
            <CarList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
