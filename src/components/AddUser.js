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
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="firstName">firstName</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              required
              value={user.firstName}
              onChange={handleInputChange}
              name="firstName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">lastName</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              required
              value={user.lastName}
              onChange={handleInputChange}
              name="lastName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              className="form-control"
              id="Username"
              required
              value={user.Username}
              onChange={handleInputChange}
              name="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={user.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">role</label>
            <input
              type="text"
              className="form-control"
              id="role"
              required
              value={user.role}
              onChange={handleInputChange}
              name="role"
            />
          </div>
          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default AddUser;