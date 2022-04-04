import {
    CREATE_USER,
    RETRIEVE_USERS,
    UPDATE_USER,
    DELETE_USER,
    DELETE_ALL_USERS,
  } from "./types";
  import AuthService from "../services/authService";
  export const createUser = (firstName, lastName, username, email, password, role) => async (dispatch) => {
    try {
      const res = await AuthService.create({ firstName, lastName, username, email, password, role });
      dispatch({
        type: CREATE_USER,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveUsers = () => async (dispatch) => {
    try {
      const res = await AuthService.getAll();
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const updateUser = (id, data) => async (dispatch) => {
    try {
      const res = await AuthService.update(id, data);
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const deleteUser = (id) => async (dispatch) => {
    try {
      await AuthService.remove(id);
      dispatch({
        type: DELETE_USER,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const deleteAllUsers = () => async (dispatch) => {
    try {
      const res = await AuthService.removeAll();
      dispatch({
        type: DELETE_ALL_USERS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const findUsersByName = (firstName) => async (dispatch) => {
    try {
      const res = await AuthService.findByName(firstName);
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };