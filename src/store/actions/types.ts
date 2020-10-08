import { GET_CARS, SET_ERROR, SET_LOADING } from '../../constants';
import { CarsResponse } from '../../constants/interfaces';
import { Action } from 'redux';

interface GetCarsAction extends Action<typeof GET_CARS> {
  payload: CarsResponse;
}

interface SetLoadingAction extends Action<typeof SET_LOADING> {
  payload: Boolean;
}

interface SetErrorAction extends Action<typeof SET_ERROR> {
  payload: Boolean;
}

export type CarsActionTypes = GetCarsAction | SetLoadingAction | SetErrorAction;
