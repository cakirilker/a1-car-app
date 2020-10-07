import { combineReducers } from 'redux';
import carsReducer from '../reducers/cars.reducer';

export const RootReducer = combineReducers({ carStore: carsReducer });

export type RootState = ReturnType<typeof RootReducer>;
