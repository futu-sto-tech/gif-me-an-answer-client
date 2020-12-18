import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      pink: string;
      darkPink: string;
      cyan: string;
      black: string;
      white: string;
      background: string;
    };
  }
}

const theme: DefaultTheme = {
  colors: {
    pink: '#DD01A1',
    darkPink: '#8D0066',
    cyan: '#00EFFF',
    black: '#000',
    white: 'white',
    background: '#2D2D2D',
  },
};

export default theme;
