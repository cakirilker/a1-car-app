import { GET_MANUFACTURERS, GET_COLORS, SET_FILTERS } from '../../constants';
import { CarsRequest, Manufacturer } from '../../constants/interfaces';
import { FilterActionTypes } from '../actions/types';

export type FiltersState = Readonly<{
  colors: string[];
  manufacturers: Manufacturer[];
  active: CarsRequest;
}>;

const initialState: FiltersState = {
  colors: [],
  manufacturers: [],
  active: {
    page: 1,
    sort: 'asc',
  },
};

export default (
  state: FiltersState = initialState,
  action: FilterActionTypes,
): FiltersState => {
  switch (action.type) {
    case GET_COLORS:
      return { ...state, colors: action.payload };
    case GET_MANUFACTURERS:
      return { ...state, manufacturers: action.payload };
    case SET_FILTERS:
      return { ...state, active: { ...state.active, ...action.payload } };
    default:
      return state;
  }
};
