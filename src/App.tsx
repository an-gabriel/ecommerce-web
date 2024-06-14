import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );
  }
}

export default App;
  