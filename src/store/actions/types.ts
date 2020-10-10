import {
  GET_CARS,
  SET_ERROR,
  SET_LOADING,
  GET_COLORS,
  GET_MANUFACTURERS,
} from '../../constants';
import { CarsResponse, Manufacturer } from '../../constants/interfaces';
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

interface GetColorsAction extends Action<typeof GET_COLORS> {
  payload: string[];
}

interface GetManufacturersAction extends Action<typeof GET_MANUFACTURERS> {
  payload: Manufacturer[];
}

export type CarsActionTypes = GetCarsAction | SetLoadingAction | SetErrorAction;
export type FilterActionTypes = GetColorsAction | GetManufacturersAction;
