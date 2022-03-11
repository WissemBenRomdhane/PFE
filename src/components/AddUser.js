import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../actions/users";
const AddUser = () => {
  const initialUserState = {
    id: null,
    firstName: "",
    lastName: "",
    Username: "",
    email: "",
    password: "",
    role: ""
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const saveUser = () => {
    const { firstName, lastName, Username, email, password, role } = user;
    dispatch(createUser(firstName, lastName, Username, email, password, role))
      .then(data => {
        setUser({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          Username: data.Username,
          email: data.email,
          password: data.password,
          role: data.role
        });
        setSubmitted(true);
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };
};
export default AddUser;