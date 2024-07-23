import React from 'react';
import MenuItemCard from '../cards/MenuItemCard';

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type CartViewerProps = {
  items: Item[];
};

const CartViewer: React.FC<CartViewerProps> = ({ items }) => (
  <div className="cart-viewer">
    <h2>Cart Items</h2>
    {items.map((item) => (
      <MenuItemCard key={item.id} item={item} />
    ))}
  </div>
);

export default CartViewer;
