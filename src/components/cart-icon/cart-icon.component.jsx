import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const { isClicked, setIsClicked } = useContext(CartContext);

  const toggleHandler = () => setIsClicked(!isClicked);
  return (
    <div className="cart-icon-container" onClick={toggleHandler}>
      <ShoppingCartIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
