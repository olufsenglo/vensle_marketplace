import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../actions/actions';

// Mock product array
const products = [
  { id: 1, name: 'Product 1', category_id: 1, price: 19.99 },
  { id: 2, name: 'Product 2', category_id: 2, price: 29.99 },
  { id: 3, name: 'Product 3', category_id: 1, price: 14.99 },
  // Add more products as needed
];

const CartComponent = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center mb-4">
              <div className="mr-4">
                <span className="font-bold">{item.quantity}x</span>
              </div>
              <div className="mr-4">
                <span>{item.name}</span>
              </div>
              <div className="mr-4">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => handleDecreaseQuantity(item.id)}
                >
                  -
                </button>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded ml-2"
                  onClick={() => handleIncreaseQuantity(item.id)}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-xl font-semibold mt-4">Available Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="flex items-center mb-2">
            <div className="mr-4">
              <span>{product.name}</span>
            </div>
            <div>
              <button
                className="px-2 py-1 bg-green-500 text-white rounded"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartComponent;
