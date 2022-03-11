import http from "../http-common";

  const getAll = () => {
    return http.get("/users/all");
  };
  const get = id => {
    return http.get(`/users/${id}`);
  };
  const create = data => {
    return http.post("/users/save", data);
  };
  const update = (id, data) => {
    return http.put(`/users/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/users/${id}`);
  };
//   deleteAll() {
//     return http.delete(`/tutorials`);
//   }
//   findByTitle(title) {
//     return http.get(`/tutorials?title=${title}`);
//   }
const UserDataService = {
  getAll,
  get,
  create,
  update,
  remove
  // removeAll,
  // findByTitle
};

export default UserDataService;