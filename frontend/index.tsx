import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.css";

import { App } from "./app";
import { CustomThemeProvider } from "./services/providers/theme";

createRoot(document.getElementById("root") as HTMLElement).render(
  <CustomThemeProvider>
    <>
      <CssBaseline />
      <App />
    </>
  </CustomThemeProvider>
);
