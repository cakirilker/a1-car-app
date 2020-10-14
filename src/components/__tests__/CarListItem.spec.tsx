import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Car } from '../../constants/interfaces';
import CarListItem from '../CarListItem';

describe('CarListItem Component', () => {
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

  beforeEach(() => {
    context = render(<CarListItem item={car} />, {
      wrapper: BrowserRouter,
    });
  });

  test('should display correct header for car', () => {
    const { queryByText } = context;
    expect(
      queryByText(`${car.manufacturerName} ${car.modelName}`),
    ).not.toBeNull();
  });

  test('should render correct information for the car', () => {
    const { queryByText } = context;
    const carInformation = `Stock # ${
      car.stockNumber
    } - ${car.mileage.number.toLocaleString()} ${car.mileage.unit.toUpperCase()} - ${
      car.fuelType
    } - ${car.color}`;
    expect(queryByText(carInformation)).not.toBeNull();
  });

  test('should have correct image url for the car', () => {
    const { queryByTestId } = context;
    expect(queryByTestId('car-list-item-image')).toHaveAttribute(
      'src',
      car.pictureUrl,
    );
  });
});
