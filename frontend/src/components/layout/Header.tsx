import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';

const Header: React.FC = () => {
  const { user } = useAppContext();

  return (
    <header className="header">
      <div className="header-background"></div>
      <nav className="flex justify-between p-6">
        <Link href="/" className="text-2xl font-bold text-white">
          Food Order App
        </Link>
        <div className="flex items-center">
          <Link href="/" className="mx-2 text-white">
            Home
          </Link>
          {user ? (
            <>
              <span className="mx-2 text-white">Welcome, {user.username}</span>
              {user.hasRestaurant && (
                <span className="mx-2 text-white">Manage Your Restaurant</span>
              )}
              <Link href="/profile" className="mx-2 text-white">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="mx-2 text-white">
                Login
              </Link>
              <Link href="/register" className="mx-2 text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;