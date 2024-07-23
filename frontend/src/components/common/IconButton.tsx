import React from 'react';

type IconButtonProps = {
  icon: string;
  onClick: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => (
  <button className="icon-button" onClick={onClick}>
    <i className={`icon-${icon}`} />
  </button>
);

export default IconButton;
