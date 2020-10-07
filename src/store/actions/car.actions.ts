import { ThunkAction } from 'redux-thunk';
import { GET_CARS, SET_ERROR, SET_LOADING } from '../../constants';
import { CarsResponse, CarsRequest } from '../../constants/interfaces';
// import { CarsActionTypes } from '../reducers/cars.reducer';
import { RootState } from '../reducers/root.reducer';
import { CarsActionTypes } from './types';

export const getCarsAction = (payload: CarsResponse): CarsActionTypes => ({
  type: GET_CARS,
  payload,
});

export const setLoadingAction = (payload: Boolean): CarsActionTypes => ({
  type: SET_LOADING,
  payload,
});

export const setErrorAction = (payload: Boolean): CarsActionTypes => ({
  type: SET_ERROR,
  payload,
});

export const getCars = (
  options: CarsRequest,
): ThunkAction<void, RootState, any, CarsActionTypes> => (
  dispatch,
  getState,
  api,
) => {
  dispatch(setLoadingAction(true));
  api
    .getCars(options)
    .then((response: CarsResponse) => {
      dispatch(getCarsAction(response));
      return Promise.resolve(response);
    })
    .catch((err: any) => {
      dispatch(setErrorAction(err));
    });
};
