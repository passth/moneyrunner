import * as React from "react";
import * as ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./index.css";

import { App } from "./app";
import { CustomThemeProvider } from "./services/providers/theme";

ReactDOM.render(
  <CustomThemeProvider>
    <>
      <CssBaseline />
      <App />
    </>
  </CustomThemeProvider>,
  document.getElementById("root")
);
