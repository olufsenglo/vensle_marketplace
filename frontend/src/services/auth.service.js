import axios from "axios";

const API_URL = "https://nominet.vensle.com/backend/api/v1/";

const register = (name, business_name, email, phone_number, address, password, password_confirmation) => {
  return axios.post(API_URL + "register", {
    name,
    business_name,
    email,
    phone_number,
    address,
    password,
    password_confirmation,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      // console.log(response);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));

        // Fetch the cart items
        axios.get(`${API_URL}cart`, {
          headers: {
            'Authorization': `Bearer ${response.data.token}`,
          },
        })
          .then((cartResponse) => {
            if (cartResponse) {
              const userCartItems = cartResponse.data;
              	    localStorage.setItem('cart', JSON.stringify(userCartItems.cart));
            }
          })
          .catch((error) => {
            console.error("Cart fetch error:", error);
          });

      }


      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("cart");	
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
