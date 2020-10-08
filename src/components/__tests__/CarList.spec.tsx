import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { CarList } from '../CarList';
import { Car } from '../../constants/interfaces';
import { BrowserRouter as Router } from 'react-router-dom';
// TODO: RenderResult type stays as any, need to find to fix it.
describe('CarList Component', () => {
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
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
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
      pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
    },
  ];
  let getCars: jest.Mock;
  let context: RenderResult;

  const renderWithProps = (props?: unknown) => {
    getCars = jest.fn(() => Promise.resolve()).mockName('getCars');
    context = render(
      <CarList
        getCars={getCars}
        cars={cars}
        loading={false}
        totalCarsCount={cars.length}
        totalPageCount={Math.ceil(cars.length / 10)}
        {...props}
      />,
      { wrapper: Router },
    );
  };

  test('should load cars on initial render', () => {
    renderWithProps();
    expect(getCars).toHaveBeenCalled();
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
      renderWithProps();
      const { queryByTestId } = context;
      expect(queryByTestId('car-item-skeleton')).toBeNull();
    });

    test('should list the cars', () => {
      const firstCarHeader = `${cars[0].manufacturerName} ${cars[0].modelName}`;
      const { queryByText } = context;
      expect(queryByText(firstCarHeader)).not.toBeNull();
    });

    test.todo('should not display the error message');

    test('should display correct header', () => {
      const { queryByText } = context;
      expect(queryByText('Showing 2 of 2 results')).not.toBeNull();
    });
  });
});
