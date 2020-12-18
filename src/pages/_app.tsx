import '../styles/index.css';
import '@reach/dialog/styles.css';

import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
