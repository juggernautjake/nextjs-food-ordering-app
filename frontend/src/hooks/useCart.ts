import { useState, useEffect } from "react";
import Cookie from "js-cookie";

export interface CartItem {
  id: string;
  quantity: number;
  attributes: {
    name: string;
    price: number;
  };
}

export interface Cart {
  items: CartItem[];
  total: number;
}

const useCart = () => {
  const cartCookie = Cookie.get("cart") !== "undefined" ? Cookie.get("cart") : null;
  const [cart, setCart] = useState<Cart>(cartCookie ? JSON.parse(cartCookie) : { items: [], total: 0 });

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: CartItem) => {
    const existingItem = cart.items.find((i) => i.id === item.id);
    if (!existingItem) {
      const newItem = { ...item, quantity: 1 };
      setCart((prevCart) => ({
        items: [...prevCart.items, newItem],
        total: prevCart.total + item.attributes.price,
      }));
    } else {
      setCart((prevCart) => ({
        items: prevCart.items.map((i) => (i.id === existingItem.id ? { ...i, quantity: i.quantity + 1 } : i)),
        total: prevCart.total + item.attributes.price,
      }));
    }
  };

  const removeItem = (item: CartItem) => {
    const existingItem = cart.items.find((i) => i.id === item.id);
    if (existingItem && existingItem.quantity > 1) {
      setCart((prevCart) => ({
        items: prevCart.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i)),
        total: prevCart.total - item.attributes.price,
      }));
    } else {
      setCart((prevCart) => ({
        items: prevCart.items.filter((i) => i.id !== item.id),
        total: prevCart.total - item.attributes.price,
      }));
    }
  };

  const resetCart = () => {
    setCart({ items: [], total: 0 });
  };

  return { cart, addItem, removeItem, resetCart };
};

export default useCart;