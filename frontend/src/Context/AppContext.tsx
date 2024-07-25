// src/context/AppContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';
import { useMutation, useApolloClient } from "@apollo/client";
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

const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
  const { cart, addItem, removeItem, resetCart } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [accordionState, setAccordionState] = useState<any>({});
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

const getUser = async (token: string, client: any) => {
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
