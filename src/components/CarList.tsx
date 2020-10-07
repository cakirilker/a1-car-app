import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store/reducers/root.reducer';
import { getCars } from '../store/actions/car.actions';
import CarListItem from './CarListItem';
import Pagination from '@material-ui/lab/Pagination/Pagination';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

const mapStateToProps = (state: RootState) => ({
  carStore: state.carStore,
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
  }),
);

export const CarList = ({ getCars, carStore }: Props) => {
  const { cars, loading, totalCarsCount, totalPageCount } = carStore;
  const classes = useStyles();
  useEffect(() => {
    getCars({ page: 1 });
  }, [getCars]);

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    getCars({ page: value });
  };

  return (
    <>
      <Typography className={classes.header} variant="h6" component="h1">
        Available cars
      </Typography>
      <Typography variant="h6" component="h1">
        {`Showing ${cars.length} of ${totalCarsCount} results`}
      </Typography>
      {loading ? (
        <div>Loading...</div>
      ) : (
        cars.map((car, i) => <CarListItem key={i} item={car} />)
      )}
      <Pagination
        count={totalPageCount}
        showFirstButton
        showLastButton
        onChange={handlePaginationChange}
      />
    </>
  );
};

export default connector(CarList);
