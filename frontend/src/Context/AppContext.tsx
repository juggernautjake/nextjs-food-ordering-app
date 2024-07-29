import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';
import { useMutation, useApolloClient, ApolloClient } from "@apollo/client";
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

interface Cart {
  items: CartItem[];
  total: number;
}

interface CartItem {
  id: string;
  quantity: number;
  attributes: {
    name: string;
    price: number;
  };
}

interface AppState {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  resetCart: () => void;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  accordionState: Record<string, boolean>;
  setAccordionState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  userProfileData: any; // TODO: Define a more specific type
  handleFavoriteToggle: (restaurantId: string, isFavorite: boolean) => Promise<boolean>;
}

const AppContext = createContext<AppState | undefined>(undefined);

const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
  const { cart, addItem, removeItem, resetCart } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [accordionState, setAccordionState] = useState<Record<string, boolean>>({});
  const [userProfileData, setUserProfileData] = useState<any>(null);
  const client = useApolloClient();

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
        const userData = await getUser(token, client);
        setUser(userData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [client]);

  useEffect(() => {
    if (user) {
      client.query({ query: GET_USER_PROFILE, variables: { id: user.id } })
        .then((result) => {
          setUserProfileData(result.data);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("Error fetching user profile data:", error);
        });
    }
  }, [user, client]);

  const handleFavoriteToggle = async (restaurantId: string, isFavorite: boolean) => {
    if (!user) return isFavorite;

    try {
      if (isFavorite) {
        await removeFavorite({
          variables: {
            userId: user.id,
            restaurantId: restaurantId,
          },
        });
      } else {
        await addFavorite({
          variables: {
            userId: user.id,
            restaurantId: restaurantId,
          },
        });
      }
      const { data } = await client.query({ query: GET_USER_PROFILE, variables: { id: user.id } });
      setUserProfileData(data);
      return !isFavorite;
    } catch (error) {
      // eslint-disable-next-line no-console
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

const getUser = async (token: string, client: ApolloClient<unknown>) => {
  const { data } = await client.query({
    query: GET_USER_PROFILE,
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