import React from 'react';

type SecondaryButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ children, onClick }) => (
  <button className="secondary-button" onClick={onClick}>
    {children}
  </button>
);

export default SecondaryButton;
