import { useState, useEffect } from "react";
import Cookie from "js-cookie";

interface CartItem {
  id: string;
  attributes: {
    price: number;
  };
  quantity?: number;
}

interface Cart {
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
    let newItem = cart.items.find((i) => i.id === item.id);
    if (!newItem) {
      newItem = { ...item, quantity: 1 };
      setCart((prevCart) => ({
        items: [...prevCart.items, newItem as CartItem],
        total: prevCart.total + item.attributes.price * 100,
      }));
    } else {
      setCart((prevCart) => ({
        items: prevCart.items.map((i) => (i.id === newItem!.id ? { ...i, quantity: (i.quantity || 0) + 1 } : i)),
        total: prevCart.total + item.attributes.price * 100,
      }));
    }
  };

  const removeItem = (item: CartItem) => {
    let newItem = cart.items.find((i) => i.id === item.id);
    if (newItem && newItem.quantity && newItem.quantity > 1) {
      setCart((prevCart) => ({
        items: prevCart.items.map((i) => (i.id === newItem!.id ? { ...i, quantity: (i.quantity || 0) - 1 } : i)),
        total: prevCart.total - item.attributes.price * 100,
      }));
    } else {
      setCart((prevCart) => ({
        items: prevCart.items.filter((i) => i.id !== item.id),
        total: prevCart.total - item.attributes.price * 100,
      }));
    }
  };

  const resetCart = () => {
    setCart({ items: [], total: 0 });
  };

  return { cart, addItem, removeItem, resetCart };
};

export default useCart;
