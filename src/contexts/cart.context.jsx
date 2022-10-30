import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  //find if items array contains product id
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  //if found increment
  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, qty: cartItem.qty + 1 }
        : cartItem
    );
  }
  //return a new array with modified cartItems

  return [...cartItems, { ...productToAdd, qty: 1 }];
};

export const CartContext = createContext({
  isClicked: false,
  setIsClicked: () => {},
  cartItems: [],
  addItemToCart: () => {},
  numOfCartItems: 0,
});

export const CartProvider = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  useEffect(() => {
    const newCartItemsCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.qty,
      0
    );

    setNumOfCartItems(newCartItemsCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    //setNumOfCartItems(numOfCartItems + 1);
  };

  const value = {
    isClicked,
    setIsClicked,
    addItemToCart,
    cartItems,
    numOfCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
