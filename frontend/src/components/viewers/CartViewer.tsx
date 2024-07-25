// src/components/viewers/CartViewer.tsx

import React from 'react';

interface CartItem {
  id: string;
  attributes: {
    price: number;
  };
  quantity?: number;
}

interface CartViewerProps {
  items: CartItem[];
}

const CartViewer: React.FC<CartViewerProps> = ({ items }) => {
  return (
    <div>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        items.map((item) => (
          <div key={item.id}>
            <p>{item.attributes.price}</p>
            <p>{item.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CartViewer;
