import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { CarList } from '../CarList';
import { BrowserRouter as Router } from 'react-router-dom';
import { cars } from '../../__mocks__/DATA';

// TODO: RenderResult type stays as any, need to find to fix it.
describe('CarList Component', () => {
  let fetchCars: jest.Mock;
  let setFilters: jest.Mock;
  let context: RenderResult;

  const renderWithProps = (props?: unknown) => {
    fetchCars = jest.fn(() => Promise.resolve()).mockName('fetchCars');
    setFilters = jest.fn(() => Promise.resolve()).mockName('setFilters');
    context = render(
      <CarList
        fetchCars={fetchCars}
        setFilters={setFilters}
        cars={cars}
        loading={false}
        error={false}
        totalCarsCount={1000}
        totalPageCount={10}
        filters={{ page: 1, sort: 'asc' }}
        {...props}
      />,
      { wrapper: Router },
    );
  };

  test('should load cars on initial render', () => {
    renderWithProps();
    expect(fetchCars).toHaveBeenCalled();
  });

  test('should display the skeletons while loading', () => {
    renderWithProps({ loading: true });
    const { queryAllByTestId } = context;
    expect(queryAllByTestId('car-item-skeleton')).toHaveLength(3);
  });

  describe('when loading succeeds', () => {
    beforeEach(() => {
      renderWithProps();
    });

    test('should not display skeletons', () => {
      const { queryByTestId } = context;
      expect(queryByTestId('car-item-skeleton')).toBeNull();
    });

    test('should list the cars', () => {
      const firstCarHeader = `${cars[0].manufacturerName} ${cars[0].modelName}`;
      const { queryByText } = context;
      expect(queryByText(firstCarHeader)).not.toBeNull();
    });

    test('should not display the error message', () => {
      const { queryByText } = context;
      expect(queryByText('An error has occured.')).toBeNull();
    });

    test('should display correct header', () => {
      const { queryByText } = context;
      expect(queryByText(`Showing 10 of 1000 results`)).not.toBeNull();
    });
  });

  describe('when fetching fails', () => {
    test('should display error message', () => {
      renderWithProps({
        error: true,
        cars: [],
        totalCarsCount: 0,
        totalPageCount: 0,
      });
      const { queryByText } = context;
      expect(queryByText('An error has occured.')).not.toBeNull();
    });
  });

  describe('when fetching fails', () => {
    test('should display error message', () => {
      renderWithProps({
        error: true,
        cars: [],
        totalCarsCount: 0,
        totalPageCount: 0,
      });
      const { queryByText } = context;
      expect(queryByText('An error has occured.')).not.toBeNull();
    });
  });
});
