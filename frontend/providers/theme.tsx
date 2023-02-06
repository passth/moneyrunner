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

export const getStoredTheme = () => JSON.parse(window.localStorage.getItem('theme'));

export const setStoredTheme = (theme: Theme) => window.localStorage.setItem('theme', JSON.stringify(theme));

export const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(getStoredTheme() || THEMES[0]);

  const updateTheme = (name: 'default' | 'dark') => {
    const theme = THEMES.find((t) => t.name === name);
    setStoredTheme(theme);
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
