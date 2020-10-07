import { combineReducers } from 'redux';

const initialState = {};

const DummyReducer = (state = initialState, action: any) => state;

export const RootReducer = combineReducers({ dummy: DummyReducer });

export type RootState = ReturnType<typeof RootReducer>;
