import { GET_CARS, SET_LOADING } from '../../constants';
import { Car } from '../../constants/interfaces';
import { CarsActionTypes } from '../actions/types';

export type CarsState = Readonly<{
  cars: Array<Car>;
  totalPageCount: number;
  totalCarsCount: number;
  loading: Boolean;
  error: null;
}>;

const initialState: CarsState = {
  cars: [],
  totalCarsCount: 0,
  totalPageCount: 0,
  loading: false,
  error: null,
};

export default (
  state: CarsState = initialState,
  action: CarsActionTypes,
): CarsState => {
  switch (action.type) {
    case GET_CARS:
      return { ...state, ...action.payload, loading: false, error: null };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
