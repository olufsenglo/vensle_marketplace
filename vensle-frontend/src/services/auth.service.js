import axios from "axios";

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

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "login", { email, password });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*const login = async (email, password) => {
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
};*/

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
