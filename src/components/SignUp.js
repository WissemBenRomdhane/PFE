import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmail } from "validator";
import { login, register } from "../actions/auth";

const Register = () => {
  let history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };
  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    dispatch(register(firstName, lastName, username, email, password, role))
      .then(() => {
        setSuccessful(true);
        dispatch(login(username, password));
        history.push("/profile")
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
  return (
    <>
      {!successful && (
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={firstName}
              onChange={onChangeFirstName}
              // validations={[required, vusername]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={lastName}
              onChange={onChangeLastName}
              // validations={[required, vusername]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              // validations={[required, vusername]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              // validations={[required, validEmail]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              // validations={[required, vpassword]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              className="form-control"
              name="role"
              onChange={onChangeRole}
            >
              <option value=""></option>
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-dark btn-lg btn-block">
              Register
            </button>
          </div>
        </form>
      )}

      {message && (
        <div className="form-group">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </>
  );
};
export default Register;
