import * as React from "react";
import * as ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./index.css";
import { CustomThemeProvider } from "./services/providers/theme";

import { App } from "./app";
import { ExampleProvider } from "./services/providers/example";

ReactDOM.render(
  <ExampleProvider>
    <CustomThemeProvider>
      <CssBaseline />
      <App />
    </CustomThemeProvider>
  </ExampleProvider>,
  document.getElementById("root")
);
