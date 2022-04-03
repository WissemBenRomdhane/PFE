import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../actions/users";
import userDataService from "../services/userService";
const User = (props) => {
  const initialUserState = {
    id: null,
    firstName: "",
    lastName: "",
    Username: "",
    email: "",
    password: "",
    role: ""
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const getUser = id => {
    userDataService.get(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };
  const updateStatus = status => {
    const data = {
      id: currentUser.id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      Username: currentUser.Username,
      email: currentUser.email,
      password: currentUser.password,
      role: currentUser.role,
    };
    dispatch(updateUser(currentUser.id, data))
      .then(response => {
        console.log(response);
        setCurrentUser({ ...currentUser });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
  const updateContent = () => {
    dispatch(updateUser(currentUser.id, currentUser))
      .then(response => {
        console.log(response);
        setMessage("The User was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
  const removeUser = () => {
    dispatch(deleteUser(currentUser.id))
      .then(() => {
        props.history.push("/users");
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">firstName</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={currentUser.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">lastName</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={currentUser.lastName}
                onChange={handleInputChange}
              />
            </div>
           
          </form>
          <button className="badge badge-danger mr-2" onClick={removeUser}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};
export default User;