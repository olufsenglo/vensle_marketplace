import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../actions/cartActions';
import Checkout from './Checkout';

const CartProductList = () => {
  const dispatch = useDispatch();
  // const products = useSelector(state => state.products);
  const cart = useSelector(state => state.cart);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  }; 

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };  

    // Load cart from localStorage on component mount
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      storedCart && dispatch({ type: 'LOAD_CART', payload: storedCart });
    }, [dispatch]);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {/* {products && products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </li>
        ))} */}
        <li> iphone - 12
          <button onClick={() => handleAddToCart({id: 1, name: "iphone", price: 299})}>Add to Cart</button>
        </li>
        <li>
          tesla
          <button onClick={() => handleAddToCart({id: 2, name: "tesla", price: 400})}>Add to Cart</button>
        </li>
      </ul>

      <h2>Shopping Cart</h2>
      <ul>
        {cart && cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} - Quantity: {item.quantity}
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
            <button onClick={() => handleIncreaseQuantity(item.id)}>Increase Quantity</button>
            <button onClick={() => handleDecreaseQuantity(item.id)}>Decrease Quantity</button>
          </li>
        ))}
      </ul>
      <p>Total Price: ${calculateTotalPrice()}</p>
      <hr />
      <Checkout />
    </div>
  );
};

export default CartProductList;