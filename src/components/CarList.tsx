import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store/reducers/root.reducer';
import { getCars } from '../store/actions/car.actions';
import CarListItem, { CarListItemSkeleton } from './CarListItem';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';

const mapStateToProps = (state: RootState) => ({
  cars: state.cars.data,
  loading: state.cars.loading,
  error: state.cars.error,
  totalCarsCount: state.cars.totalCarsCount,
  totalPageCount: state.cars.totalPageCount,
});

const mapDispatchToProps = {
  getCars,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
    },
    header: {
      fontWeight: 'bold',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

export const CarList = ({
  getCars,
  cars,
  loading,
  error,
  totalCarsCount,
  totalPageCount,
}: Props) => {
  const classes = useStyles();
  useEffect(() => {
    getCars();
  }, []);

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    getCars({ page: value, sort: 'asc' });
  };

  return (
    <>
      <Typography className={classes.header} variant="h6" component="h1">
        Available cars
      </Typography>
      <Typography variant="h6" component="h1">
        {`Showing ${cars.length} of ${totalCarsCount} results`}
      </Typography>
      {error && <Alert severity="error">An error has occured.</Alert>}
      {loading
        ? Array(3)
            .fill(0)
            .map((item, i) => <CarListItemSkeleton key={i} />)
        : cars.map((car, i) => <CarListItem key={i} item={car} />)}
      <Pagination
        className={classes.pagination}
        count={totalPageCount}
        showFirstButton
        showLastButton
        onChange={handlePaginationChange}
      />
    </>
  );
};

export default connector(CarList);
