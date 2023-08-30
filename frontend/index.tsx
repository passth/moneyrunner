import * as React from "react";
import * as ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./index.css";

import { App } from "./app";
import { FullScreenProvider } from "./services/providers/fullscreen";
import { CustomThemeProvider } from "./services/providers/theme";
import { ExampleProvider } from "./services/providers/example";

ReactDOM.render(
  <ExampleProvider>
    <CustomThemeProvider>
      <FullScreenProvider>
        <CssBaseline />
        <App />
      </FullScreenProvider>
    </CustomThemeProvider>
  </ExampleProvider>,
  document.getElementById("root")
);
