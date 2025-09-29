import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [watchlistItems, setWatchlistItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    const storedWatchlistItems = localStorage.getItem("watchlistItems");
    if (storedWatchlistItems) {
      setWatchlistItems(JSON.parse(storedWatchlistItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("watchlistItems", JSON.stringify(watchlistItems));
  }, [watchlistItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((i) => i.id === item.id);
      if (itemExists) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWatchlist = (item) => {
    setWatchlistItems((prevItems) => {
      const itemExists = prevItems.find((i) => i.id === item.id);
      if (itemExists) {
        return prevItems.filter((i) => i.id !== item.id);
      } else {
        return [...prevItems, item];
      }
    });
  };

  const isInWatchlist = (id) => {
    return watchlistItems.some((item) => item.id === id);
  };

  const value = {
    cartItems,
    watchlistItems,
    addToCart,
    removeFromCart,
    clearCart,
    toggleWatchlist,
    isInWatchlist,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};