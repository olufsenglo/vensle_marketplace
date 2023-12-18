import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderSummary = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <p>Loading...</p>;
  }

  const totalAmount = order.products.reduce((total, product) => total + parseFloat(product.price), 0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Order Summary</h1>
      <p>
        <strong>Order ID:</strong> {order.id}
      </p>
      <p>
        <strong>User ID:</strong> {order.user_id}
      </p>
      <p>
        <strong>Stripe Session ID:</strong> {order.stripe_session_id}
      </p>

      <h2>Ordered {order.products.length === 1 ? 'Product' : 'Products'}</h2>
      <ul>
        {order.products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>

      <hr />

      <div>
        <p>
          <strong>Total Order Amount:</strong> ${totalAmount.toFixed(2)}
        </p>
        <p>
          <strong>Number of Products:</strong> {order.products.length}
        </p>
        <p>
          <strong>Order Status:</strong> {order.status || 'Pending'}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
