import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
  const { imageUrl, name, qty, price, id } = item;

  const { removeItem, addItemToCart, decreaseCartItemQty } =
    useContext(CartContext);

  console.log('id for item is: ' + id);
  const removeHandler = () => removeItem(item);
  const addItemHandler = () => addItemToCart(item);
  const decreaseHandler = () => decreaseCartItemQty(item);
  return (
    <div className="checkout-item-container">
      <img className="image-container" src={imageUrl} alt={name} />
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decreaseHandler}>
          &#10094;
        </div>
        <span className="value"> {qty} </span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>

      <div className="remove-button" onClick={removeHandler}>
        &#10005;
      </div>
    </div>
  );
};
export default CheckoutItem;
