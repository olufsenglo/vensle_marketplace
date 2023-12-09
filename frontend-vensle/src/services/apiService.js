// apiService.js

const BASE_URL = "http://localhost:8000/api/v1/";

const apiService = {
  addToCart: async (productId, quantity) => {
    const response = await fetch(`${BASE_URL}/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    });

    return response.json();
  },

  removeFromCart: async (productId) => {
    const response = await fetch(`${BASE_URL}/remove-from-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });

    return response.json();
  },

  updateCart: async (productId, quantity) => {
    const response = await fetch(`${BASE_URL}/update-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    });

    return response.json();
  },

  mergeCarts: async (unauthenticatedCart) => {
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
      // Handle the case where the access token is not available (e.g., redirect to login)
      console.error('Access token not available');
      return;
    }

    const response = await fetch(`${BASE_URL}/merge-carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ unauthenticatedCart }),
    });

    return response.json();
  },

  clearCart: async () => {
    const response = await fetch(`${BASE_URL}/clear-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  },
};

export default apiService;
