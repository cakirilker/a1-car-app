import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Filters } from '../Filters';
import fireEvent from '@testing-library/user-event';
import { Manufacturer } from '../../constants/interfaces';

describe('Filters Component', () => {
  const colors = ['red', 'blue', 'green', 'black', 'yellow', 'white', 'silver'];
  const manufacturers: Manufacturer[] = [
    {
      name: 'Audi',
      models: [{ name: 'A8' }],
    },
    {
      name: 'Fiat',
      models: [{ name: 'Marea' }],
    },
  ];
  let loadColors: jest.Mock;
  let loadManufacturers: jest.Mock;
  let getCars: jest.Mock;
  let setFilters: jest.Mock;
  let context: RenderResult;

  const renderWithProps = (props?: unknown) => {
    loadColors = jest.fn(() => Promise.resolve(colors)).mockName('loadColors');
    loadManufacturers = jest
      .fn(() => Promise.resolve())
      .mockName('loadManufacturers');
    getCars = jest.fn(() => Promise.resolve()).mockName('getCars');
    setFilters = jest.fn(() => Promise.resolve()).mockName('setFilters');
    context = render(
      <Filters
        colors={colors}
        manufacturers={manufacturers}
        loadColors={loadColors}
        loadManufacturers={loadManufacturers}
        getCars={getCars}
        filters={{ page: 1, sort: 'asc' }}
        setFiltersAction={setFilters}
        {...props}
      />,
    );
  };
  describe('initial state', () => {
    test('should load colors on initial render', () => {
      renderWithProps();
      expect(loadColors).toHaveBeenCalledTimes(1);
    });

    test('should load manufacturers on initial render', () => {
      renderWithProps();
      expect(loadManufacturers).toHaveBeenCalledTimes(1);
    });

    test('should display color filter with default option', () => {
      renderWithProps();
      const { getByText, getByTestId } = context;
      const colorSelect = getByTestId('color-filter-input-select');
      expect(colorSelect.querySelector('input')).toHaveProperty('value', '');
      expect(getByText('All Car Colors')).not.toBeNull();
    });

    test('should display manufacturer filter with default option', () => {
      renderWithProps();
      const { getByText, getByTestId } = context;
      const manufacturerSelect = getByTestId(
        'manufacturer-filter-input-select',
      );
      expect(manufacturerSelect.querySelector('input')).toHaveProperty(
        'value',
        '',
      );
      expect(getByText('All Manufacturers')).not.toBeNull();
    });
  });

  describe('color filter', () => {
    test('should render given colors', () => {
      renderWithProps();
      const { queryAllByRole, container } = context;
      // const trigger = getByRole('button');
      const trigger = container.querySelector('#color-filter-input-select');
      // const trigger = container.querySelector('#color-filter-input-select');
      // fireEvent.mouseDown(trigger);
      fireEvent.click(trigger);
      const options = queryAllByRole('option');
      expect(options).toHaveLength(colors.length + 1);
    });

    test('should call setFilters whenever color filter changed', () => {
      renderWithProps();
      const { getAllByRole, container } = context;
      const trigger = container.querySelector('#color-filter-input-select');
      fireEvent.click(trigger);
      fireEvent.click(getAllByRole('option')[1]);
      expect(setFilters).toHaveBeenCalled();
    });
  });

  describe('manufacturer filter', () => {
    test('should render given manufacturers', () => {
      renderWithProps();
      const { queryAllByRole, container } = context;
      const trigger = container.querySelector(
        '#manufacturer-filter-input-select',
      );
      fireEvent.click(trigger);
      const options = queryAllByRole('option');
      expect(options).toHaveLength(manufacturers.length + 1);
    });
    test('should call setFilters whenever manufacturer filter changed', () => {
      renderWithProps();
      const { getAllByRole, container } = context;
      const trigger = container.querySelector(
        '#manufacturer-filter-input-select',
      );
      fireEvent.click(trigger);
      fireEvent.click(getAllByRole('option')[1]);
      expect(setFilters).toHaveBeenCalled();
    });
  });

  describe('When filters submit', () => {
    test('should call getCars when Filter button pressed', () => {
      renderWithProps({
        filters: { manufacturer: 'Audi', color: 'red', sort: 'asc' },
      });
      const { getByTestId } = context;
      const button = getByTestId('cars-filter-button');
      expect(getCars).not.toHaveBeenCalled();
      fireEvent.click(button);
      expect(getCars).toHaveBeenCalledWith({
        color: 'red',
        manufacturer: 'Audi',
        page: 1,
        sort: 'asc',
      });
    });
  });
});
