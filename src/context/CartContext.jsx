import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    const storedFavoriteItems = localStorage.getItem("favoriteItems");
    if (storedFavoriteItems) {
      setFavoriteItems(JSON.parse(storedFavoriteItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

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

  const toggleFavorite = (item) => {
    setFavoriteItems((prevItems) => {
      const itemExists = prevItems.find((i) => i.id === item.id);
      if (itemExists) {
        return prevItems.filter((i) => i.id !== item.id);
      } else {
        return [...prevItems, item];
      }
    });
  };

  const isFavorite = (id) => {
    return favoriteItems.some((item) => item.id === id);
  };

  const value = {
    cartItems,
    favoriteItems,
    addToCart,
    removeFromCart,
    clearCart,
    toggleFavorite,
    isFavorite,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
