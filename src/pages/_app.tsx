import '../styles/index.css';
import '@reach/dialog/styles.css';

import { AppProps } from 'next/app';
import ErrorFallback from 'components/ErrorFallback';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <ErrorFallback>
      <Component {...pageProps} />
    </ErrorFallback>
  </ThemeProvider>
);

export default App;
