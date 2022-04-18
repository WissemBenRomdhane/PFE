import axios from "axios";
import authHeader from "./authHeader";
const API_URL = "http://localhost:8083/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getDeveloperBoard = () => {
  return axios.get(API_URL + "developer", { headers: authHeader() });
};
const getClientBoard = () => {
  return axios.get(API_URL + "client", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
export default {
  getPublicContent,
  getDeveloperBoard,
  getClientBoard,
  getAdminBoard,
};
// import http from "../http-common";

//   const getAll = () => {
//     return http.get("/users");
//   };
//   const findByName = firstName => {
//     return http.get(`/users?firstName=${firstName}`);
//   };
//   const get = id => {
//     return http.get(`/users/${id}`);
//   };
//   const create = data => {
//     return http.post("/users", data);
//   };
//   const update = (id, data) => {
//     return http.put(`/users/${id}`, data);
//   };
//   const remove = id => {
//     return http.delete(`/users/${id}`);
//   };
// const  removeAll = () => {
//     return http.delete(`/users`);
//   };

// const UserDataService = {
//   getAll,
//   get,
//   create,
//   update,
//   remove,
//   removeAll,
//   findByName
// };

// export default UserDataService;
