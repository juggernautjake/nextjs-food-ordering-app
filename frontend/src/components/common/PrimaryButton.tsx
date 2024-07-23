import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick }) => (
  <button className="primary-button" onClick={onClick}>
    {children}
  </button>
);

export default PrimaryButton;
