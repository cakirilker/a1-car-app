import CarsReducer, { CarsState, fetchCars } from '../reducers/cars.reducer';
import { CarsResponse } from '../../constants/interfaces';
import { cars } from '../../__mocks__/DATA';
import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
} from '@reduxjs/toolkit';

describe('cars reducer', () => {
  describe('initial state', () => {
    let store: EnhancedStore<CarsState>;

    beforeEach(() => {
      store = configureStore({ reducer: CarsReducer });
    });

    test('should not have loading flag true', () => {
      expect(store.getState().loading).toEqual(false);
    });

    test('should not have error flag true', () => {
      expect(store.getState().error).toEqual(false);
    });
  });

  describe('getCars Action', () => {
    describe('when fetching succeeds', () => {
      const carsResponse: CarsResponse = {
        cars,
        totalCarsCount: 2,
        totalPageCount: 1,
      };
      // TODO:
      let store: EnhancedStore<CarsState, any>;

      beforeEach(async () => {
        const api = {
          getCars: () => Promise.resolve(carsResponse),
        };

        store = configureStore({
          reducer: CarsReducer,
          middleware: getDefaultMiddleware({
            thunk: { extraArgument: { api } },
          }),
        });
        await store.dispatch(fetchCars());
      });

      test('should store the cars', () => {
        expect(store.getState().data).toEqual(cars);
      });

      test('should store the totalCarsCount and totalPageCount', () => {
        expect(store.getState().totalCarsCount).toEqual(
          carsResponse.totalCarsCount,
        );
        expect(store.getState().totalPageCount).toEqual(
          carsResponse.totalPageCount,
        );
      });

      test('should clear loading and error flag upon storing', () => {
        expect(store.getState().loading).toEqual(false);
        expect(store.getState().error).toEqual(false);
      });
    });

    describe('while fetching', () => {
      let store: EnhancedStore<CarsState, any>;
      beforeEach(async () => {
        const api = {
          getCars: () => new Promise(() => {}),
        };
        const initialState: CarsState = {
          data: [],
          detail: { loading: false, error: false },
          totalCarsCount: 0,
          totalPageCount: 0,
          loading: false,
          error: true,
        };

        store = configureStore({
          reducer: CarsReducer,
          preloadedState: initialState,
          middleware: getDefaultMiddleware({
            thunk: { extraArgument: { api } },
          }),
        });

        store.dispatch(fetchCars());
      });
      test('should set loading flag true', async () => {
        expect(store.getState().loading).toEqual(true);
      });
      test('should set the error flag to false', () => {
        expect(store.getState().error).toEqual(false);
      });
    });

    describe('when fetching fails', () => {
      let store: EnhancedStore<CarsState, any>;
      beforeEach(async () => {
        const api = {
          getCars: () => Promise.reject(),
        };
        store = configureStore({
          reducer: CarsReducer,
          middleware: getDefaultMiddleware({
            thunk: { extraArgument: { api } },
          }),
        });
        await store.dispatch(fetchCars());
      });
      test('should set loading flag false', () => {
        expect(store.getState().loading).toEqual(false);
      });
      test('should set the error flag to true', () => {
        expect(store.getState().error).toEqual(true);
      });
    });
  });
});
