import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from '../context/AuthContext';
import { GlobalStyle } from '../styles/global';
import { defaultTheme } from '../styles/themes/default';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <ToastContainer />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
