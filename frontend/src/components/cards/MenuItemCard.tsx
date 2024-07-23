// src/components/cards/MenuItemCard.tsx

import React from 'react';

type MenuItemProps = {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
  };
};

const MenuItemCard: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>{item.price}</p>
    </div>
  );
};

export default MenuItemCard;
