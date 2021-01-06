import '../styles/index.css';
import '@reach/dialog/styles.css';

import { AppProps } from 'next/app';
import ErrorFallback from 'components/ErrorFallback';
import MainLayout from 'components/MainLayout';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <ErrorFallback>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ErrorFallback>
  </ThemeProvider>
);

export default App;
