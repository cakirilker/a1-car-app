import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { Car } from '../../constants/interfaces';
import { CarDetail } from '../CarDetail';
import fireEvent from '@testing-library/user-event';
import { match as Match } from 'react-router';
import { MemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';

const path = `/details/:id`;

describe('CarDetail component', () => {
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
    pictureUrl: 'https://auto1-js-task-api--mufasa71.repl.co/images/car.svg',
  };
  let context: RenderResult;
  let clearCarDetail: jest.Mock;
  let fetchCarDetail: jest.Mock;
  let routeComponentPropsMock: jest.Mock;

  const renderWithProps = (props?: unknown) => {
    clearCarDetail = jest
      .fn(() => Promise.resolve())
      .mockName('clearCarDetail');
    fetchCarDetail = jest
      .fn(() => Promise.resolve())
      .mockName('fetchCarDetail');

    routeComponentPropsMock = jest.fn(() => ({
      history: {} as MemoryHistory,
      location: {} as Location,
      match: {
        params: { id: `${car.stockNumber}` },
        isExact: false,
        path,
        url: path.replace(':id', `${car.stockNumber}`),
      } as Match<{ id: string }>,
    }));

    context = render(
      <CarDetail
        detail={{ data: car, loading: false, error: false }}
        fetchCarDetail={fetchCarDetail}
        clearCarDetail={clearCarDetail}
        {...routeComponentPropsMock()}
        {...props}
      />,
    );
  };

  describe('inital render', () => {
    test('should call fetchCarDetail on mount', () => {
      renderWithProps({ detail: { loading: false, error: false } });
      expect(fetchCarDetail).toBeCalled();
      expect(fetchCarDetail).toBeCalledWith(car.stockNumber);
    });
  });

  test('should call clearCarDetail on unmount', () => {
    renderWithProps();
    const { unmount } = context;
    unmount();
    expect(clearCarDetail).toBeCalled();
  });

  describe('while loading', () => {
    test('should display loading indicator when loading is true', () => {
      renderWithProps({ detail: { loading: true, error: false } });
      const { getByTestId } = context;
      expect(getByTestId('loading-indicator')).not.toBeNull();
    });
  });

  describe('when fetching detail succeeds', () => {
    beforeEach(() => {
      renderWithProps();
    });
    test('should display the car image', () => {
      const { queryByTestId } = context;
      expect(queryByTestId('car-detail-image')).toHaveStyle(
        `background-image: url("${car.pictureUrl}");`,
      );
    });

    test('should display the model and make', () => {
      const { queryByText } = context;
      expect(
        queryByText(`${car.manufacturerName} ${car.modelName}`),
      ).not.toBeNull();
    });

    test('should display the car information correctly', () => {
      const { queryByText } = context;
      const carInformation = `Stock # ${
        car.stockNumber
      } - ${car.mileage.number.toLocaleString()} ${car.mileage.unit.toUpperCase()} - ${
        car.fuelType
      } - ${car.color}`;
      expect(queryByText(carInformation)).not.toBeNull();
    });
  });

  describe('adding/removing favorites', () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, 'setItem');
      jest.spyOn(Storage.prototype, 'getItem');
    });
    afterEach(() => {
      localStorage.clear();
    });

    test('should able to add car to the favorites', () => {
      renderWithProps();
      const { getByTestId } = context;
      const button = getByTestId('favorite-car-button');
      expect(button).toHaveTextContent('Save');
      act(() => {
        fireEvent.click(button);
      });
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'favorites',
        `[${car.stockNumber}]`,
      );
    });
    test('should able to remove car from the favorites', () => {
      renderWithProps();
      const { getByTestId } = context;
      const button = getByTestId('favorite-car-button');
      act(() => {
        fireEvent.click(button);
      });
      expect(button).toHaveTextContent('Remove');
      act(() => {
        fireEvent.click(button);
      });
      expect(localStorage.setItem).toHaveBeenNthCalledWith(
        3,
        'favorites',
        '[]',
      );
    });
  });

  describe('when fetching detail fails', () => {
    test('should display the error message', () => {
      renderWithProps({ detail: { loading: false, error: true } });
      const { getByText } = context;
      expect(getByText('An error has occured.')).not.toBeNull();
    });
  });
});
