import { GET_CARS, SET_ERROR, SET_LOADING } from '../../constants';
import { CarsResponse } from '../../constants/interfaces';
import { Action as ReduxAction } from 'redux';

interface GetCarsAction extends ReduxAction {
  type: typeof GET_CARS;
  payload: CarsResponse;
}

interface SetLoadingAction extends ReduxAction {
  type: typeof SET_LOADING;
  payload: Boolean;
}

interface SetErrorAction extends ReduxAction {
  type: typeof SET_ERROR;
  payload: Boolean;
}

export type CarsActionTypes = GetCarsAction | SetLoadingAction | SetErrorAction;
