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

const removeCartItem = (cartItems, productToRemove) => {
  const newCart = cartItems.filter((item) => item.id !== productToRemove.id);
  return newCart;
};

const decreaseItemQty = (cartItems, productToDecrease) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToDecrease.id
  );

  //check if qty of item found is 1. Equal 1? return

  if (existingCartItem.qty === 1) {
    return cartItems.filter((item) => item.id !== productToDecrease.id);
  }

  return cartItems.map((item) =>
    item.id === productToDecrease.id ? { ...item, qty: item.qty - 1 } : item
  );
};

export const CartContext = createContext({
  isClicked: false,
  setIsClicked: () => {},
  cartItems: [],
  addItemToCart: () => {},
  numOfCartItems: 0,
  removeItem: () => {},
  decreaseCartItemQty: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartItemsCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.qty,
      0
    );
    setNumOfCartItems(newCartItemsCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.qty,
      0
    );
    setCartTotal(newTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItem = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const decreaseCartItemQty = (productToDecrease) => {
    setCartItems(decreaseItemQty(cartItems, productToDecrease));
  };
  const value = {
    isClicked,
    setIsClicked,
    addItemToCart,
    cartItems,
    numOfCartItems,
    removeItem,
    decreaseCartItemQty,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
