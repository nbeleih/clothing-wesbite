import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles';
const CheckoutItem = ({ item }) => {
  const { imageUrl, name, qty, price, id } = item;

  const { removeItem, addItemToCart, decreaseCartItemQty } =
    useContext(CartContext);

  const removeHandler = () => removeItem(item);
  const addItemHandler = () => addItemToCart(item);
  const decreaseHandler = () => decreaseCartItemQty(item);
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={decreaseHandler}>&#10094;</Arrow>
        <Value> {qty} </Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>

      <RemoveButton onClick={removeHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};
export default CheckoutItem;
