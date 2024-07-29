// src/components/common/PrimaryButton.tsx

import React, { ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => (
  <button 
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    {...props}
  >
    {children}
  </button>
);

export default PrimaryButton;