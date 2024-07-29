import { ApolloClient, InMemoryCache, HttpLink, from, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import Cookie from 'js-cookie';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = Cookie.get('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(() => {
      // Use a logging service in production instead of console.log
      // console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    // console.log(`[Network error]: ${networkError}`);
  }
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState: NormalizedCacheObject | null = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState: NormalizedCacheObject) => {
  const store = initializeApollo(initialState);
  return store;
};