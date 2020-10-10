import { ThunkAction } from 'redux-thunk';
import { GET_COLORS, GET_MANUFACTURERS } from '../../constants';
import { Auto1API, Manufacturer } from '../../constants/interfaces';
import { RootState } from '../reducers/root.reducer';
import { FilterActionTypes } from './types';

export const loadColorsAction = (payload: string[]): FilterActionTypes => ({
  type: GET_COLORS,
  payload: payload,
});

export const loadManufacturersAction = (
  payload: Manufacturer[],
): FilterActionTypes => ({
  type: GET_MANUFACTURERS,
  payload: payload,
});

export const loadColors = (): ThunkAction<
  Promise<FilterActionTypes>,
  RootState,
  Auto1API,
  FilterActionTypes
> => (dispatch, getState, api) => {
  return api
    .getColors()
    .then((response: string[]) => dispatch(loadColorsAction(response)))
    .catch((err: any) => dispatch(loadColorsAction([])));
};

export const loadManufacturers = (): ThunkAction<
  Promise<FilterActionTypes>,
  RootState,
  Auto1API,
  FilterActionTypes
> => (dispatch, getState, api) => {
  return api
    .getManufacturers()
    .then((response: Manufacturer[]) =>
      dispatch(loadManufacturersAction(response)),
    );
};
