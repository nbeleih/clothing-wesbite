import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const { isClicked, setIsClicked, numOfCartItems } = useContext(CartContext);

  const toggleHandler = () => setIsClicked(!isClicked);

  console.log(numOfCartItems);
  return (
    <div className="cart-icon-container" onClick={toggleHandler}>
      <ShoppingCartIcon className="shopping-icon" />
      <span className="item-count">{numOfCartItems}</span>
    </div>
  );
};

export default CartIcon;
