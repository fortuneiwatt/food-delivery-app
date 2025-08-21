import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart((prev) => {
      const exists = prev.find((f) => f.name === item.name);
      if (exists) {
        return prev.map((f) =>
          f.name === item.name ? { ...f, qty: f.qty + 1 } : f
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeFromCart(name) {
    setCart((prev) => prev.filter((f) => f.name !== name));
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
