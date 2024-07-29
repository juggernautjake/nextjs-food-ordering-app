import React from 'react'; // Add this line
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { AppContextProvider } from '../context/AppContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
        <Footer />
      </AppContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
