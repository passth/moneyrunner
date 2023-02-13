import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import './index.css';
import { CustomThemeProvider } from './providers/theme';

import App from './App';
import { ExampleProvider } from './providers/example';

ReactDOM.render(
  <ExampleProvider>
    <CustomThemeProvider>
      <CssBaseline />
      <App />
    </CustomThemeProvider>
  </ExampleProvider>,
  document.getElementById('root')
);
