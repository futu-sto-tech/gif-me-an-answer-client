import '../styles/index.css';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

import { AppProps } from 'next/app';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
