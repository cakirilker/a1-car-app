import CarsReducer, {
  CarsState,
  fetchCarDetail,
  fetchCars,
} from '../reducers/cars.reducer';
import { Car, CarsResponse } from '../../constants/interfaces';
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

    test('should not have detail loading flag true', () => {
      expect(store.getState().detail.loading).toEqual(false);
    });

    test('should not have detail error flag true', () => {
      expect(store.getState().detail.error).toEqual(false);
    });
  });

  describe('fetchCars Action', () => {
    describe('when fetching succeeds', () => {
      const carsResponse: CarsResponse = {
        cars,
        totalCarsCount: 2,
        totalPageCount: 1,
      };
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

  describe('fetchCarDetail Action', () => {
    describe('when fetching succeeds', () => {
      const car: Car = {
        stockNumber: 29544,
        manufacturerName: 'Mercedes-Benz',
        modelName: 'Strich Acht',
        color: 'white',
        mileage: {
          number: 100988,
          unit: 'km',
        },
        fuelType: 'Diesel',
        pictureUrl:
          'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
      };
      let store: EnhancedStore<CarsState, any>;

      beforeEach(async () => {
        const api = {
          getCar: () => Promise.resolve(car),
        };

        store = configureStore({
          reducer: CarsReducer,
          middleware: getDefaultMiddleware({
            thunk: { extraArgument: { api } },
          }),
        });
        await store.dispatch(fetchCarDetail(car.stockNumber));
      });

      test('should store car detail', () => {
        expect(store.getState().detail.data).toEqual(car);
      });

      test('should clear loading and error flag', () => {
        expect(store.getState().detail.error).toEqual(false);
        expect(store.getState().detail.loading).toEqual(false);
      });
    });
    describe('while fetching', () => {
      let store: EnhancedStore<CarsState, any>;
      beforeEach(async () => {
        const api = {
          getCar: () => new Promise(() => {}),
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

        store.dispatch(fetchCarDetail(1));
      });
      test('should set loading flag as true', () => {
        expect(store.getState().detail.loading).toBe(true);
      });
      test('should set error flag as false', () => {
        expect(store.getState().detail.error).toBe(false);
      });
    });
    describe('when fetching fails', () => {
      let store: EnhancedStore<CarsState, any>;
      beforeEach(async () => {
        const api = {
          getCar: () => Promise.reject(),
        };
        store = configureStore({
          reducer: CarsReducer,
          middleware: getDefaultMiddleware({
            thunk: { extraArgument: { api } },
          }),
        });
        await store.dispatch(fetchCarDetail(1));
      });
      test('should set loading flag as false', () => {
        expect(store.getState().detail.loading).toBe(false);
      });
      test('should set error flag as true', () => {
        expect(store.getState().detail.error).toBe(true);
      });
    });
  });
});
