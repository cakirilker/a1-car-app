import { manufacturers, colors } from '../../__mocks__/DATA';
import FiltersReducer, {
  fetchColors,
  fetchManufacturers,
  FiltersState,
  setFilters,
} from '../reducers/filters.reducer';
import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
} from '@reduxjs/toolkit';

describe('filters reducer', () => {
  describe('initial state', () => {
    let store: EnhancedStore<FiltersState>;

    beforeEach(() => {
      store = configureStore({
        reducer: FiltersReducer,
      });
    });

    test('should not have active color filter', () => {
      expect(store.getState().active.color).toBeUndefined();
    });
    test('should not have active manufacturer fitler', () => {
      expect(store.getState().active.manufacturer).toBeUndefined();
    });
    test('should have initial page value 1', () => {
      expect(store.getState().active.page).toEqual(1);
    });
  });

  describe('actions', () => {
    let store: EnhancedStore<FiltersState, any>;

    beforeEach(() => {
      const api = {
        getColors: () => Promise.resolve(colors),
        getManufacturers: () => Promise.resolve(manufacturers),
      };
      store = configureStore({
        reducer: FiltersReducer,
        middleware: getDefaultMiddleware({ thunk: { extraArgument: { api } } }),
      });
    });

    describe('fetchColors Action', () => {
      test('should store colors', async () => {
        await store.dispatch(fetchColors());
        expect(store.getState().colors).toEqual(colors);
      });
    });

    describe('fetchManufacturers Action', () => {
      test('should store manufacturers', async () => {
        await store.dispatch(fetchManufacturers());
        expect(store.getState().manufacturers).toEqual(manufacturers);
      });
    });

    describe('setFilters Action', () => {
      test('should set given filters as active', () => {
        expect(store.getState().active).toEqual({ page: 1, sort: 'asc' });
        store.dispatch(setFilters({ color: 'red', manufacturer: 'Audi' }));
        expect(store.getState().active).toEqual({
          page: 1,
          sort: 'asc',
          color: 'red',
          manufacturer: 'Audi',
        });
        store.dispatch(setFilters({ page: 2 }));
        expect(store.getState().active).toEqual({
          page: 2,
          sort: 'asc',
          color: 'red',
          manufacturer: 'Audi',
        });
      });
    });
  });
});
