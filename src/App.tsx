import React, { Suspense, lazy } from 'react';
import { CssBaseline, createMuiTheme, LinearProgress } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Footer, Header } from './components';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';

const Home = lazy(() => import('./containers/Home'));
const CarDetail = lazy(() => import('./containers/CarDetail'));
const Error404 = lazy(() => import('./containers/Error404'));

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
    },
    primary: {
      light: '#F29D57',
      main: '#EA7F28',
      dark: '#D37324',
      contrastText: '#fff',
    },
    text: {
      primary: '#4A4A4A',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 88,
      flexWrap: 'wrap',
    },
  },
  typography: {
    button: {
      fontSize: 14,
    },
    fontSize: 14,
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        width: 128,
      },
    },
    MuiLink: {
      root: {
        textTransform: 'none',
        color: '#EA7F28',
        '&:hover': {
          color: '#D37324',
        },
        '&.active': {
          color: '#D37324',
        },
      },
    },
    MuiAppBar: {
      root: {
        backgroundColor: '#fff',
      },
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <main id="content">
            <Suspense fallback={<LinearProgress />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/details/:id" component={CarDetail} />
                <Route path="*">
                  <Error404 />
                </Route>
              </Switch>
            </Suspense>
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
