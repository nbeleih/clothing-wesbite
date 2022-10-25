import { createContext, useState } from 'react';

export const CartContext = createContext({
  isClicked: false,
  setIsClicked: () => {},
});

export const CartProvider = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);

  const value = { isClicked, setIsClicked };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
