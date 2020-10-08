import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import CarsReducer, { CarsState } from '../reducers/cars.reducer';
import { getCars } from '../actions/car.actions';
import { CarsActionTypes } from '../actions/types';
import { Car, CarsResponse } from '../../constants/interfaces';

describe('cars reducer', () => {
  describe('initial state', () => {
    let store: Store<CarsState, CarsActionTypes>;

    beforeEach(() => {
      store = createStore(CarsReducer, applyMiddleware(thunk));
    });

    test('should not have loading flag true', () => {
      expect(store.getState().loading).toEqual(false);
    });

    test('should not have error flag true', () => {
      expect(store.getState().error).toEqual(false);
    });
  });

  describe('getCars action', () => {
    describe('when fetching succeeds', () => {
      const cars: Array<Car> = [
        {
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
        },
        {
          stockNumber: 39504,
          manufacturerName: 'Mercedes-Benz',
          modelName: 'CLS-Klasse',
          color: 'silver',
          mileage: {
            number: 101029,
            unit: 'km',
          },
          fuelType: 'Diesel',
          pictureUrl:
            'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
        },
      ];

      const carsResponse: CarsResponse = {
        cars,
        totalCarsCount: 2,
        totalPageCount: 1,
      };
      // TODO:
      let store: Store<CarsState, any>;

      beforeEach(() => {
        const api = {
          getCars: () => Promise.resolve(carsResponse),
        };

        store = createStore(
          CarsReducer,
          applyMiddleware(thunk.withExtraArgument(api)),
        );
        store.dispatch(getCars());
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
      let store: Store<CarsState, any>;
      beforeEach(() => {
        const api = {
          getCars: () => new Promise(() => {}),
        };
        const initialState: CarsState = {
          data: [],
          totalCarsCount: 0,
          totalPageCount: 0,
          loading: false,
          error: true,
        };
        store = createStore(
          CarsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );
        store.dispatch(getCars());
      });
      test('should set loading flag true', () => {
        expect(store.getState().loading).toEqual(true);
      });
      test('should set the error flag to false', () => {
        expect(store.getState().error).toEqual(false);
      });
    });

    describe('when fetching fails', () => {
      let store: Store<CarsState, any>;
      beforeEach(() => {
        const api = {
          getCars: () => Promise.reject(),
        };
        store = createStore(
          CarsReducer,
          applyMiddleware(thunk.withExtraArgument(api)),
        );
        store.dispatch(getCars());
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
