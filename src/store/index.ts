import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { RootReducer } from './reducers/root.reducer';

const store = createStore(
  RootReducer,
  compose(applyMiddleware(thunk), devToolsEnhancer({})),
);

export default store;
