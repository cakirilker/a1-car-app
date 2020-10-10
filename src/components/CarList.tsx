import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store/reducers/root.reducer';
import { getCars } from '../store/actions/car.actions';
import { setFiltersAction } from '../store/actions/filter.actions';
import CarListItem, { CarListItemSkeleton } from './CarListItem';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';

const mapStateToProps = (state: RootState) => ({
  cars: state.cars.data,
  loading: state.cars.loading,
  error: state.cars.error,
  totalCarsCount: state.cars.totalCarsCount,
  totalPageCount: state.cars.totalPageCount,
  filters: state.filters.active,
});

const mapDispatchToProps = {
  getCars,
  setFiltersAction,
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
  setFiltersAction,
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
    getCars();
  }, []);

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setFiltersAction({ page: value });
    getCars({ ...filters, page: value });
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
