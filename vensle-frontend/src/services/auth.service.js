import axios from "axios";

//const API_URL = "https://nominet.vensle.com/backend/api/v1/";
const API_URL = "https://nominet.vensle.com/backend/api/v1/";

const register = (
  name,
  business_name,
  email,
  phone_number,
  address,
  password,
  password_confirmation
) => {
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
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
