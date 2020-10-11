import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store/reducers/root.reducer';
import { setFilters } from '../store/reducers/filters.reducer';
import { fetchCars } from '../store/reducers/cars.reducer';
import CarListItem, { CarListItemSkeleton } from './CarListItem';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';
import { CarsRequest } from '../constants/interfaces';

const mapStateToProps = (state: RootState) => ({
  cars: state.cars.data,
  loading: state.cars.loading,
  error: state.cars.error,
  totalCarsCount: state.cars.totalCarsCount,
  totalPageCount: state.cars.totalPageCount,
  filters: state.filters.active,
});

const mapDispatchToProps = {
  fetchCars,
  setFilters: (payload: CarsRequest) => setFilters(payload),
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
  fetchCars,
  setFilters,
  cars,
  loading,
  error,
  totalCarsCount,
  totalPageCount,
  filters,
}: Props) => {
  const classes = useStyles();
  const { page } = filters;

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setFilters({ page: value });
    fetchCars({ ...filters, page: value });
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
        page={page}
        showFirstButton
        showLastButton
        onChange={handlePaginationChange}
      />
    </>
  );
};

export default connector(CarList);
