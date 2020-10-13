import {
  Button,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { RootState, fetchCarDetail, clearCarDetail } from '../store/reducers';

const mapStateToProps = (state: RootState) => ({
  detail: state.cars.detail,
});

const mapDispatchToProps = {
  fetchCarDetail,
  clearCarDetail: () => clearCarDetail(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps<{ id: string }>;
type Props = PropsFromRouter & PropsFromRedux & {};

const useStyles = makeStyles({
  root: {
    padding: 24,
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
  },
  loading: {
    margin: 'auto',
  },
});

export const CarDetail = ({
  match: {
    params: { id },
  },
  detail,
  fetchCarDetail,
  clearCarDetail,
}: Props) => {
  const { loading, error, data } = detail;
  const classes = useStyles();
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem('favorites') || '[]') as number[],
  );
  useEffect(() => {
    fetchCarDetail(+id);
    return () => {
      clearCarDetail();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavoriteButtonClick = () => {
    if (favorites.includes(data?.stockNumber as number)) {
      setFavorites(cur => cur.filter(f => f !== data?.stockNumber));
    } else {
      setFavorites(cur => [...cur, data?.stockNumber as number]);
    }
  };
  return (
    <div>
      <div className={classes.coverImage}>
        {data && (
          <CardMedia
            className={classes.coverImage}
            image={data?.pictureUrl}
            data-testid="car-detail-image"
          />
        )}
      </div>
      <Container className={classes.root} maxWidth="md">
        {loading && (
          <CircularProgress
            data-testid="loading-indicator"
            className={classes.loading}
          />
        )}
        {error && <Alert severity="error">An error has occured.</Alert>}
        {!error && data && (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={8}>
              <Typography className={classes.title} variant="h4" component="h1">
                {data?.manufacturerName} {data?.modelName}
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                style={{ textTransform: 'capitalize', margin: '24px 0' }}
              >
                Stock # {data?.stockNumber} -{' '}
                {data?.mileage.number.toLocaleString()}{' '}
                {data?.mileage.unit.toUpperCase()} - {data?.fuelType} -{' '}
                {data?.color}
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
                  onClick={handleFavoriteButtonClick}
                >
                  {favorites.includes(data?.stockNumber as number)
                    ? 'Remove'
                    : 'Save'}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default withRouter(connector(CarDetail));
