import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utilis';

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

export const USER_ACTION_TYPES = {
  SET_IS_CLICKED: 'SET_IS_CLICKED',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_IS_CLICKED:
      return {
        ...state,
        isClicked: payload,
      };

    case USER_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  isClicked: null,
  cartItems: [],
  numOfCartItems: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, isClicked, numOfCartItems, cartTotal } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartItemsCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.qty,
      0
    );

    const newTotal = newCartItems.reduce(
      (totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.qty,
      0
    );

    dispatch(
      createAction(USER_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newTotal,
        numOfCartItems: newCartItemsCount,
      })
    );
  };

  const setIsClicked = (bool) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_IS_CLICKED, bool));
  };
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const removeItem = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const decreaseCartItemQty = (productToDecrease) => {
    const newCartItems = decreaseItemQty(cartItems, productToDecrease);
    updateCartItemsReducer(newCartItems);
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
