import React from 'react';
import { CssBaseline, Container, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Footer, Header } from './components';
const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      root: { height: '80px', minHeight: '80px', maxHeight: '80px' },
    },
    MuiToolbar: {
      root: {
        height: 'inherit !important',
        maxHeight: 'inherit !important',
        minHeight: 'inherit !important',
      },
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container>Hello</Container>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
