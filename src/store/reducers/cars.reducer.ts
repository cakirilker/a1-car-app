import {
  GET_CARS,
  GET_CAR_DETAILS,
  SET_ERROR,
  SET_LOADING,
} from '../../constants';
import { Car } from '../../constants/interfaces';
import { CarsActionTypes } from '../actions/types';

export type CarsState = Readonly<{
  data: Array<Car>;
  detail?: Car;
  totalPageCount: number;
  totalCarsCount: number;
  loading: Boolean;
  error: Boolean;
}>;

const initialState: CarsState = {
  data: [],
  totalCarsCount: 0,
  totalPageCount: 0,
  loading: false,
  error: false,
};

export default (
  state: CarsState = initialState,
  action: CarsActionTypes,
): CarsState => {
  switch (action.type) {
    case GET_CARS: {
      const { cars: data, totalCarsCount, totalPageCount } = action.payload;
      return {
        ...state,
        data,
        totalCarsCount,
        totalPageCount,
        loading: false,
        error: false,
      };
    }
    case GET_CAR_DETAILS: {
      return { ...state, detail: action.payload };
    }
    case SET_LOADING:
      return { ...state, loading: action.payload, error: false };
    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
