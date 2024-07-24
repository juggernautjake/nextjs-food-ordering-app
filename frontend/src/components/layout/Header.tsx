// src/components/layout/Header.tsx

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';

const Header: React.FC = () => {
  const { user } = useAppContext();

  return (
    <header className="header">
      <div className="header-background"></div>
      <nav className="flex justify-between p-6">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-white">Food Order App</a>
        </Link>
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="mx-2 text-white">Home</a>
          </Link>
          {user ? (
            <>
              <span className="mx-2 text-white">Welcome, {user.username}</span>
              {user.hasRestaurant && (
                <span className="mx-2 text-white">Manage Your Restaurant</span>
              )}
              <Link href="/profile" legacyBehavior>
                <a className="mx-2 text-white">Profile</a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" legacyBehavior>
                <a className="mx-2 text-white">Login</a>
              </Link>
              <Link href="/register" legacyBehavior>
                <a className="mx-2 text-white">Register</a>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
