import React from 'react';
import Link from 'next/link';

const NavBar = () => (
  <nav className="navbar">
    <ul className="flex space-x-4">
      <li><Link href="/" className="text-white hover:text-gray-400">Home</Link></li>
      <li><Link href="/profile" className="text-white hover:text-gray-400">Profile</Link></li>
      <li><Link href="/settings" className="text-white hover:text-gray-400">Settings</Link></li>
    </ul>
  </nav>
);

export default NavBar;