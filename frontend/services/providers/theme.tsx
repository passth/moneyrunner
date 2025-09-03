import * as React from "react";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { defaultTheme, darkTheme, buildTheme } from "../theme";

type ThemeDefinition = {
  type: string;
  backgroundColor: string;
  primaryColor: {
    main: string;
    dark: string;
    light: string;
  };
};

type Theme = {
  name: string;
  display: string;
  theme: ThemeDefinition;
};

type ThemeValue = {
  theme: Theme;
  setTheme: (name: string) => void;
};

export const CustomThemeContext = React.createContext<ThemeValue>(null);

export const THEMES: Theme[] = [
  {
    name: "default",
    display: "Default theme",
    theme: defaultTheme,
  },
  {
    name: "dark",
    display: "Dark theme",
    theme: darkTheme,
  },
];

const THEME_MAP = THEMES.reduce((acc, theme) => {
  acc[theme.name] = theme;
  return acc;
}, {});

export const getStoredThemeName = () => window.localStorage.getItem("theme");

export const setStoredThemeName = (themeName: string) =>
  window.localStorage.setItem("theme", themeName);

export const CustomThemeProvider = ({ children }) => {
  const themeName = getStoredThemeName();
  const [theme, setTheme] = React.useState<Theme>(THEME_MAP[themeName] || THEMES[0]);
  const muiTheme = buildTheme(theme.theme);

  const updateTheme = (name: "default" | "dark") => {
    const th = THEMES.find((t) => t.name === name);
    setStoredThemeName(th.name);
    setTheme(th);
  };

  const value = React.useMemo(() => ({ theme, setTheme: updateTheme }), [theme, updateTheme]);
  return (
    <CustomThemeContext.Provider value={value}>
      <ThemeProvider theme={createTheme(muiTheme)}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export const useCustomTheme = () => React.useContext(CustomThemeContext);
