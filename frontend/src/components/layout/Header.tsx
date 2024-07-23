// src/components/layout/Header.tsx

import React from 'react';
import { useAppContext } from '../../Context/AppContext';

const Header = () => {
  const { user } = useAppContext();

  return (
    <header>
      <nav>
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        {user && (
          <>
            <span>Welcome, {user.username}</span>
            {user.hasRestaurant && <span>You manage a restaurant</span>}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
