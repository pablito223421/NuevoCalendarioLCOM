import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Historias/historias';
import * as serviceWorker from './servicewoker';

import './index.css';
import App from './App';
import registerIcons from './registerfaicon';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

registerIcons();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
