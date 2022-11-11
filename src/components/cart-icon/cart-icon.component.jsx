import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const { isClicked, setIsClicked, numOfCartItems } = useContext(CartContext);

  const toggleHandler = () => setIsClicked(!isClicked);

  console.log(numOfCartItems);
  return (
    <CartIconContainer onClick={toggleHandler}>
      <ShoppingIcon />
      <ItemCount>{numOfCartItems}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
