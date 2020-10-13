import React from 'react';
import {
  render,
  RenderOptions,
  RenderResult,
  screen,
  fireEvent,
} from '@testing-library/react';
import { Error404 } from '..';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import store from '../../store';

const AllTheProviders = ({ children }: any) => {
  return (
    <MemoryRouter>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

describe('404 Page Component', () => {
  let context: RenderResult;
  beforeEach(() => {
    context = customRender(<Error404 />);
  });
  test('should render correctly', () => {
    expect(context).toMatchSnapshot();
  });

  test('should display not found text', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      '404 - Not Found',
    );
  });

  test('should display informative message', () => {
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(
      'Sorry, the page you are looking for does not exists.',
    );
  });

  test('should display return to the homepage text', () => {
    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent(
      'You can always go back to the homepage.',
    );
  });

  test('should redirect to the homepage when link is clicked', () => {
    context.unmount();
    const history = createMemoryHistory();
    history.push('/some-route');
    render(
      <Router history={history}>
        <Provider store={store}>
          <Error404 />
        </Provider>
      </Router>,
    );
    const link = screen.getByTestId('homepage-link');
    fireEvent.click(link);
    expect(history.location.pathname).toEqual('/');
  });
});
