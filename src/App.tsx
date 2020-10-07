import React from 'react';
import { CssBaseline, Container, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Footer, Header } from './components';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';

const theme = createMuiTheme({});

const Home = () => <Container>Hello</Container>;

const Error404Page = () => <Container>404</Container>;

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="*">
              <Error404Page />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
