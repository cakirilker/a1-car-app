import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GET_CARS, SET_ERROR, SET_LOADING } from '../../constants';
import { CarsResponse, CarsRequest } from '../../constants/interfaces';
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

export const getCars: ActionCreator<ThunkAction<
  Promise<CarsActionTypes>,
  RootState,
  null,
  CarsActionTypes
>> = (options?: CarsRequest) => (dispatch, getState, api: any) => {
  dispatch(setLoadingAction(true));
  return api
    .getCars(options)
    .then((response: CarsResponse) => dispatch(getCarsAction(response)))
    .catch((err: any) => dispatch(setErrorAction(true)));
};
