import {
  Card,
  CardContent,
  CardMedia,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Car } from '../constants/interfaces';
import CarThumbnailPlaceholder from '../images/car-thumbnail-placeholder.png';

interface Props {
  item: Car;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: '12px 0',
    padding: 12,
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '0 24px 0 !important',
  },
  image: {
    width: 100,
    height: 75,
  },
  heading: {
    fontWeight: 'bold',
  },
});

export const CarListItemSkeleton = () => {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      raised={false}
      variant="outlined"
      square
      elevation={0}
      data-testid="car-item-skeleton"
    >
      <Skeleton variant="rect" className={classes.image} />
      <CardContent className={classes.content}>
        <Skeleton width={300} height={40} />
        <Skeleton />
        <Skeleton width={100} />
      </CardContent>
    </Card>
  );
};

export const CarListItem = ({ item }: Props) => {
  const classes = useStyles();
  const {
    manufacturerName,
    modelName,
    stockNumber,
    mileage: { unit, number },
    fuelType,
    color,
    pictureUrl,
  } = item;
  return (
    <Card
      className={classes.root}
      raised={false}
      variant="outlined"
      square
      elevation={0}
    >
      <CardMedia
        className={classes.image}
        image={pictureUrl}
        data-testid="car-list-item-image"
        alt="Car Thumbnail"
        title="Car Thumbnail"
        component="img"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
          ((e.target as HTMLImageElement).src = CarThumbnailPlaceholder)
        }
      />
      <CardContent className={classes.content}>
        <Typography className={classes.heading} variant="h6">
          {manufacturerName} {modelName}
        </Typography>
        <Typography variant="subtitle2" style={{ textTransform: 'capitalize' }}>
          Stock # {stockNumber} - {number.toLocaleString()} {unit.toUpperCase()}{' '}
          - {fuelType} - {color}
        </Typography>
        <Link
          color="primary"
          component={RouterLink}
          to={`/details/${stockNumber}`}
        >
          <Typography variant="subtitle2">View Details</Typography>
        </Link>
      </CardContent>
    </Card>
  );
};
export default CarListItem;
