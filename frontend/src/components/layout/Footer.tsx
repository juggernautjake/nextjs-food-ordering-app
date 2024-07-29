import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
  <footer className="footer">
    <p>&copy; 2024 Your Company</p>
    <nav>
      <Link href="/terms" className="mx-2 text-white">
        Terms
      </Link>
      <Link href="/privacy" className="mx-2 text-white">
        Privacy
      </Link>
      <Link href="/contact" className="mx-2 text-white">
        Contact
      </Link>
    </nav>
  </footer>
);

export default Footer;