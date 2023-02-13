import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core';
import { defaultTheme, darkTheme } from '../theme';

export const CustomThemeContext = React.createContext(null);

type Theme = {
  name: 'default' | 'dark';
  display: string;
  theme: any;
};

export const THEMES: Theme[] = [
  {
    name: 'default',
    display: 'Default theme',
    theme: defaultTheme,
  },
  {
    name: 'dark',
    display: 'Dark theme',
    theme: darkTheme,
  },
];

const THEME_MAP = THEMES.reduce((acc, theme) => {
  acc[theme.name] = theme;
  return acc;
}, {});

export const getStoredThemeName = () => window.localStorage.getItem('theme');

export const setStoredThemeName = (themeName: string) => window.localStorage.setItem('theme', themeName);

export const CustomThemeProvider = ({ children }) => {
  const themeName = getStoredThemeName();
  const [theme, setTheme] = React.useState(THEME_MAP[themeName] || THEMES[0]);

  const updateTheme = (name: 'default' | 'dark') => {
    const theme = THEMES.find((t) => t.name === name);
    setStoredThemeName(theme.name);
    setTheme(theme);
  };

  return (
    <CustomThemeContext.Provider value={{
      theme,
      setTheme: updateTheme,
    }}>
      <ThemeProvider theme={createTheme(theme.theme)}>
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export const useCustomTheme = () => React.useContext(CustomThemeContext);
