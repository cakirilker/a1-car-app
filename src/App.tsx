import React from 'react';
import { CssBaseline, Container, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Footer, Header } from './components';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import Home from './containers/Home';
import CarDetail from './containers/CarDetail';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
    },
  },
});

const Error404Page = () => <Container>404</Container>;

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename={process.env.PUBLIC_URL}>
          <Header />
          <main id="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/details/:id" component={CarDetail} />
              <Route path="*">
                <Error404Page />
              </Route>
            </Switch>
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
