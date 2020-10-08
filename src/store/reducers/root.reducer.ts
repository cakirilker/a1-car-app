import { combineReducers } from 'redux';
import carsReducer from '../reducers/cars.reducer';

export const RootReducer = combineReducers({ cars: carsReducer });

export type RootState = ReturnType<typeof RootReducer>;
