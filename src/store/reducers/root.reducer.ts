import CarsReducer from './cars.reducer';
import FiltersReducer from './filters.reducer';
import { combineReducers } from '@reduxjs/toolkit';

export const RootReducer = combineReducers({
  cars: CarsReducer,
  filters: FiltersReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
