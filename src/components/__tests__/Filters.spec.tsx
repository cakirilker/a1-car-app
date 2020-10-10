import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Filters } from '../Filters';
import fireEvent from '@testing-library/user-event';

describe('Filters Component', () => {
  const colors = ['red', 'blue', 'green', 'black', 'yellow', 'white', 'silver'];
  let loadColors: jest.Mock;
  let loadManufacturers: jest.Mock;
  let getCars: jest.Mock;
  let setFilters: jest.Mock;
  let context: RenderResult;

  describe('Color filter', () => {
    const renderWithProps = (props?: unknown) => {
      loadColors = jest
        .fn(() => Promise.resolve(colors))
        .mockName('loadColors');
      loadManufacturers = jest
        .fn(() => Promise.resolve())
        .mockName('loadManufacturers');
      getCars = jest.fn(() => Promise.resolve()).mockName('getCars');
      setFilters = jest.fn(() => Promise.resolve()).mockName('setFilters');
      context = render(
        <Filters
          colors={colors}
          manufacturers={[]}
          loadColors={loadColors}
          loadManufacturers={loadManufacturers}
          getCars={getCars}
          filters={{ page: 1, sort: 'asc' }}
          setFiltersAction={setFilters}
          {...props}
        />,
      );
    };
    test('should load colors on initial render', () => {
      renderWithProps();
      expect(loadColors).toHaveBeenCalledTimes(1);
    });

    test('should render given colors', () => {
      renderWithProps();
      const { queryAllByRole, container } = context;
      // const trigger = getByRole('button');
      const trigger = container.querySelector('#color-filter-input-select');
      // fireEvent.mouseDown(trigger);
      fireEvent.click(trigger);
      const options = queryAllByRole('option');
      expect(options).toHaveLength(8);
    });
    test.todo('should render only All car colors option with empty colors');
    test.todo('should call setFilters whenever color changed');
    test.todo('should call setFilters whenever manufacturer changed');
    test.todo('should call getCars when Filter button pressed');
  });
});
