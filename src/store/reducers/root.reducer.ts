import carsReducer from '../reducers/cars.reducer';
import filtersReducer from '../reducers/filters.reducer';
import { combineReducers } from '@reduxjs/toolkit';

export const RootReducer = combineReducers({
  cars: carsReducer,
  filters: filtersReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
