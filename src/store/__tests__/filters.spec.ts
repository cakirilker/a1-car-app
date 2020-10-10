import { applyMiddleware, createStore, Store } from 'redux';
import FiltersReducer, { FiltersState } from '../reducers/filters.reducer';
import {
  loadColors,
  loadManufacturers,
  setFiltersAction,
} from '../actions/filter.actions';
import { FilterActionTypes } from '../actions/types';
import thunk from 'redux-thunk';
import { manufacturers, colors } from '../../__mocks__/DATA';

describe('filters reducer', () => {
  describe('initial state', () => {
    let store: Store<FiltersState, FilterActionTypes>;

    beforeEach(() => {
      store = createStore(FiltersReducer, applyMiddleware(thunk));
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
    let store: Store<FiltersState, any>;
    let api;

    beforeEach(() => {
      api = {
        getColors: () => Promise.resolve(colors),
        getManufacturers: () => Promise.resolve(manufacturers),
      };
      store = createStore(
        FiltersReducer,
        applyMiddleware(thunk.withExtraArgument(api)),
      );
    });

    describe('loadColors Action', () => {
      beforeEach(() => {
        store.dispatch(loadColors());
      });
      test('should store colors', () => {
        expect(store.getState().colors).toEqual(colors);
      });
    });

    describe('loadManufacturers Action', () => {
      beforeEach(() => {
        store.dispatch(loadManufacturers());
      });
      test('should store manufacturers', () => {
        expect(store.getState().manufacturers).toEqual(manufacturers);
      });
    });

    describe('setFilters Action', () => {
      test('should set given filters as active', () => {
        expect(store.getState().active).toEqual({ page: 1, sort: 'asc' });
        store.dispatch(
          setFiltersAction({ color: 'red', manufacturer: 'Audi' }),
        );
        expect(store.getState().active).toEqual({
          page: 1,
          sort: 'asc',
          color: 'red',
          manufacturer: 'Audi',
        });
        store.dispatch(setFiltersAction({ page: 2 }));
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
