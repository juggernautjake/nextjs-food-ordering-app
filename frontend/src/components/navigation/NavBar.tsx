// src/components/layout/NavBar.tsx

import React from 'react';

const NavBar = () => (
  <nav className="navbar">
    <ul className="flex space-x-4">
      <li><a href="/" className="text-white hover:text-gray-400">Home</a></li>
      <li><a href="/profile" className="text-white hover:text-gray-400">Profile</a></li>
      <li><a href="/settings" className="text-white hover:text-gray-400">Settings</a></li>
    </ul>
  </nav>
);

export default NavBar;
