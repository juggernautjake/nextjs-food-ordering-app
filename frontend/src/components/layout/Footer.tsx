// src/components/layout/Footer.tsx

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
  <footer className="footer">
    <p>&copy; 2024 Your Company</p>
    <nav>
      <Link href="/terms" legacyBehavior>
        <a className="mx-2 text-white">Terms</a>
      </Link>
      <Link href="/privacy" legacyBehavior>
        <a className="mx-2 text-white">Privacy</a>
      </Link>
      <Link href="/contact" legacyBehavior>
        <a className="mx-2 text-white">Contact</a>
      </Link>
    </nav>
  </footer>
);

export default Footer;
