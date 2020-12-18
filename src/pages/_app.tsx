import '../styles/index.css';
import '@reach/dialog/styles.css';

import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import MainLayout from 'components/MainLayout';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </ThemeProvider>
);

export default App;
