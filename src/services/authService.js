import axios from "axios";
const API_URL = "http://localhost:8083/api/auth/";
const register = (firstName, lastName, username, email, password, role) => {
  return axios.post(API_URL + "signup", {
    firstName,
    lastName,
    username,
    email,
    password,
    role,
  });
};
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
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