export const ORANGE = {
  50: '#FEF9F0',
  100: '#FDEED8',
  200: '#FBDEB1',
  300: '#F8BE67',
  400: '#FF9800',
  500: '#E07800',
  600: '#D15920',
  700: '#A9401B',
  800: '#843417',
  900: '#682E16',
};

export const GREEN = {
  50: '#F5FBF6',
  100: '#E8F4EC',
  200: '#CDE9D7',
  300: '#A6DAB5',
  400: '#7BC58D',
  500: '#5CB06D',
  600: '#449752',
  700: '#0A853B',
  800: '#106A34',
  900: '#0C4926',
};

export const BLUE = {
  50: '#F4F8FD',
  100: '#EDF2FD',
  200: '#C2D5FF',
  300: '#9CB7FF',
  400: '#6683FF',
  500: '#4258FF',
  600: '#363DF5',
  700: '#2A2ED8',
  800: '#252AAE',
  900: '#262C89',
};

export const YELLOW = {
  50: '#FEFCEB',
  100: '#FFFAC2',
  200: '#FFF189',
  300: '#FFDF39',
  400: '#FDCD12',
  500: '#ECB306',
  600: '#CC8B02',
  700: '#A36205',
  800: '#864D0D',
  900: '#5F340E',
};

export const RED = {
  50: '#FEF3F2',
  100: '#FFE7E5',
  200: '#FFCCC8',
  300: '#FFA8A2',
  400: '#FC776D',
  500: '#F44336',
  600: '#D9291C',
  700: '#BE2217',
  800: '#9D2017',
  900: '#82211A',
};

export const GRAY = {
  50: '#F7F7F8',
  100: '#EFEFF1',
  200: '#E2E3E5',
  300: '#CED0D5',
  400: '#B5B9BF',
  500: '#8D929C',
  600: '#6F767B',
  700: '#5C616A',
  800: '#4C5057',
  900: '#212326',
};

export const ICE_BLUE = '#EAF7FE';
export const PURPLE_ABYSS = '#160833';
export const BRIGHT_PURPLE = '#8060FF';
export const LIME_GREEN = '#21BF60';
export const WHITE = '#FFFFFF';
export const BLACK = '#000000';

export const createTheme = ({
  primaryColor,
  backgroundColor,
  type,
}) => ({
  palette: {
    type,
    background: {
      default: backgroundColor,
    },
    primary: {
      main: primaryColor[700],
      dark: primaryColor[800],
      light: primaryColor[100],
      white: WHITE,
      black: BLACK,
      lightGrey: GRAY[300],
      grey: GRAY[600],
    },
    secondary: {
      main: primaryColor[500],
    },
    error: {
      text: RED[700],
      main: RED[500],
      background: RED[50],
      inactive: RED[300],
    },
    warning: {
      light: RED[50],
      main: ORANGE[400],
      dark: ORANGE[600],
      background: ORANGE[50],
      text: ORANGE[800],
      icon: ORANGE[800],
    },
    info: {
      main: BLUE[500],
      text: BLUE[500],
      background: BLUE[50],
    },
  },
});

export const defaultTheme = createTheme({
  primaryColor: GREEN,
  backgroundColor: WHITE,
  type: 'light',
});

export const darkTheme = createTheme({
  primaryColor: GREEN,
  backgroundColor: "#212121",
  type: 'dark',
});
