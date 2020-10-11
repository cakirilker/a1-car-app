import {
  Button,
  CardMedia,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store/reducers/root.reducer';
import { getCarDetails } from '../store/actions/car.actions';

const mapStateToProps = (state: RootState) => ({
  detail: state.cars.detail,
});

const mapDispatchToProps = {
  getCarDetails,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps<{ id: string }>;
type Props = PropsFromRouter & PropsFromRedux & {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '24px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    coverImage: {
      height: 350,
      backgroundColor: '#EDEDED',
      backgroundPosition: 'center center',
      backgroundSize: 'contain',
    },
    title: {
      fontWeight: 'bold',
    },
    favoriteContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: 24,
      height: 'min-content',
    },
    favoriteButton: {
      alignSelf: 'flex-end',
      padding: `6px ${theme.spacing(5)}px`,
    },
  }),
);

const CarDetail = ({
  match: {
    params: { id },
  },
  detail,
  getCarDetails,
}: Props) => {
  const classes = useStyles();

  useEffect(() => {
    if (!isNaN(+id)) {
      getCarDetails(+id);
    }
  }, [getCarDetails]);

  return (
    <div>
      <CardMedia className={classes.coverImage} image={detail?.pictureUrl} />
      <Container className={classes.root} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8}>
            <Typography className={classes.title} variant="h4" component="h1">
              {detail?.manufacturerName} {detail?.modelName}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              style={{ textTransform: 'capitalize', margin: '24px 0' }}
            >
              Stock # {detail?.stockNumber} -{' '}
              {detail?.mileage.number.toLocaleString()}{' '}
              {detail?.mileage.unit.toUpperCase()} - {detail?.fuelType} -{' '}
              {detail?.color}
            </Typography>
            <Typography>
              This car is currently available and can be delivered as soon as
              tomorrow morning. Please be aware that delivery times shown in
              this page are not definitive and may change due to bad weather
              conditions.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper
              variant="outlined"
              square
              className={classes.favoriteContainer}
            >
              <Typography align="left" gutterBottom>
                If you like this car, click the button and save it in your
                collection of favorite items.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                data-testid="favorite-car-button"
                fullWidth={false}
                size="medium"
                className={classes.favoriteButton}
              >
                Save
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default withRouter(connector(CarDetail));
