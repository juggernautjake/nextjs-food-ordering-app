// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { AppContextProvider } from '../Context/AppContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </AppContextProvider>
  );
}

export default MyApp;
