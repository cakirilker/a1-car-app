import { ThunkAction } from 'redux-thunk';
import {
  GET_CARS,
  SET_ERROR,
  SET_LOADING,
  GET_CAR_DETAILS,
} from '../../constants';
import {
  CarsResponse,
  CarsRequest,
  Auto1API,
  Car,
} from '../../constants/interfaces';
import { RootState } from '../reducers/root.reducer';
import { CarsActionTypes } from './types';

export const getCarsAction = (payload: CarsResponse): CarsActionTypes => ({
  type: GET_CARS,
  payload,
});

export const getCarDetailsAction = (payload: Car): CarsActionTypes => ({
  type: GET_CAR_DETAILS,
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
  options?: CarsRequest,
): ThunkAction<
  Promise<CarsActionTypes>,
  RootState,
  Auto1API,
  CarsActionTypes
> => (dispatch, getState, api) => {
  dispatch(setLoadingAction(true));
  return api
    .getCars(options)
    .then((response: CarsResponse) => dispatch(getCarsAction(response)))
    .catch((err: any) => dispatch(setErrorAction(true)));
};

export const getCarDetails = (
  payload: number,
): ThunkAction<
  Promise<CarsActionTypes>,
  RootState,
  Auto1API,
  CarsActionTypes
> => (dispatch, getState, api) => {
  return api
    .getCar(payload)
    .then((response: Car) => dispatch(getCarDetailsAction(response)))
    .catch((err: any) => dispatch(setErrorAction(true)));
};
