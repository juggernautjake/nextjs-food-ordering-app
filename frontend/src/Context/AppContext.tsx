// src/Context/AppContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextProps {
  children: ReactNode;
}

interface AppState {
  user: {
    username: string;
    hasRestaurant: boolean;
  } | null;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    user: {
      username: 'JohnDoe', // Example username, replace with actual data
      hasRestaurant: true, // Example state, replace with actual data
    },
  });

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
