import { ThunkAction } from 'redux-thunk';
import { RootReducer, RootState } from './reducers';
import api from '../api';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Action } from 'redux';

const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware({
    thunk: { extraArgument: { api } },
  }),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
