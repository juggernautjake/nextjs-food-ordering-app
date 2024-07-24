// src/context/AppContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';
import { ApolloClient, InMemoryCache, createHttpLink, useMutation, gql } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import useCart from "../hooks/useCart";
import { GET_USER_PROFILE, ADD_FAVORITE, REMOVE_FAVORITE } from "../utils/queries";

interface AppContextProps {
  children: ReactNode;
}

interface User {
  id: string;
  username: string;
  hasRestaurant: boolean;
}

interface AppState {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  cart: any;
  addItem: any;
  removeItem: any;
  resetCart: any;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  accordionState: any;
  setAccordionState: React.Dispatch<React.SetStateAction<any>>;
  userProfileData: any;
  handleFavoriteToggle: (restaurantId: string, isFavorite: boolean) => Promise<boolean>;
}

const AppContext = createContext<AppState | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:1337";

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = Cookie.get('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    typePolicies: {
      Restaurant: {
        keyFields: ["id"],
      },
    },
  }),
  defaultOptions: {
    mutate: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});

const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
  const { cart, addItem, removeItem, resetCart } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [accordionState, setAccordionState] = useState<any>({});
  const [userProfileData, setUserProfileData] = useState<any>(null);

  const [addFavorite] = useMutation(ADD_FAVORITE, {
    refetchQueries: [{ query: GET_USER_PROFILE, variables: { id: user?.id } }],
  });

  const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
    refetchQueries: [{ query: GET_USER_PROFILE, variables: { id: user?.id } }],
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookie.get("token");
      if (!token) return;

      try {
        const userData = await getUser(token);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      client.query({ query: GET_USER_PROFILE, variables: { id: user.id } })
        .then((result: any) => {
          setUserProfileData(result.data);
        })
        .catch((error: any) => {
          console.error("Error fetching user profile data:", error);
        });
    }
  }, [user]);

  const handleFavoriteToggle = async (restaurantId: string, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        await removeFavorite({
          variables: {
            userId: user!.id,
            restaurantId: restaurantId,
          },
        });
      } else {
        await addFavorite({
          variables: {
            userId: user!.id,
            restaurantId: restaurantId,
          },
        });
      }
      const { data } = await client.query({ query: GET_USER_PROFILE, variables: { id: user!.id } });
      setUserProfileData(data);
      return !isFavorite;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return isFavorite;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addItem,
        removeItem,
        resetCart,
        showCart,
        setShowCart,
        accordionState,
        setAccordionState,
        userProfileData,
        handleFavoriteToggle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const getUser = async (token: string) => {
  const { data } = await client.query({
    query: gql`
      query {
        me {
          id
          email
          username
        }
      }
    `,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  return data.me;
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export { AppContext, AppContextProvider, useAppContext };
