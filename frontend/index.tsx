import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import './fonts/fonts.css';
import './fonts/CentraNo1-Bold.woff';
import './fonts/CentraNo1-Bold.woff2';
import './fonts/CentraNo1-Book.woff';
import './fonts/CentraNo1-Book.woff2';
import './fonts/CentraNo1-Medium.woff';
import './fonts/CentraNo1-Medium.woff2';
import './fonts/ppagrandir-textbold-webfont.woff';
import './fonts/ppagrandir-textbold-webfont.woff2';
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
