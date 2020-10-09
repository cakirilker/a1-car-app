import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Filters } from '..';

describe('Filters Component', () => {
  const colors = ['red', 'blue', 'green', 'black', 'yellow', 'white', 'silver'];

  describe('Color filter', () => {
    test('should load colors on initial render', () => {
      const loadColors = jest
        .fn(() => Promise.resolve(colors))
        .mockName('loadColors');
      render(<Filters colors={colors} loadColors={loadColors}></Filters>);
      expect(loadColors).toHaveBeenCalledTimes(1);
    });
    test('should render given colors', () => {
      render(<Filters colors={colors} loadColors={() => {}}></Filters>);
    });
    test('should render only No Color option with empty colors', () => {
      render(<Filters colors={[]} loadColors={() => {}}></Filters>);
    });
  });
});
