import { GET_MANUFACTURERS, GET_COLORS } from '../../constants';
import { Manufacturer } from '../../constants/interfaces';
import { FilterActionTypes } from '../actions/types';

export type FiltersState = Readonly<{
  colors: string[];
  manufacturers: Manufacturer[];
}>;

const initialState: FiltersState = {
  colors: [],
  manufacturers: [],
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
    default:
      return state;
  }
};
