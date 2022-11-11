import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    console.log('Fire click handler for addToCart');
    addItemToCart(product);
  };

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addToCartHandler}
      >
        Add to Cart
      </Button>
    </ProductCartContainer>
  );
};
export default ProductCard;
