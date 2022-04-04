import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardClient from "./components/BoardClient";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import AddUser from "./components/AddUser";
const App = () => {
  const [showClientBoard, setShowClientBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  useEffect(() => {
    if (currentUser) {
      setShowClientBoard(currentUser.roles.includes("ROLE_CLIENT"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Orchestrateur de Test
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {showClientBoard && (
              <li className="nav-item">
                <Link to={"/client"} className="nav-link">
                  Client Board
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/client" component={BoardClient} />
            {/* <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
};
export default App;
// // import logo from './logo.svg';
// // import './App.css';
// // import { Component } from 'react';

// // class App extends Component{
// //   state = {
// //     users: []
// //   };
  
// //   async componentDidMount() {
// //     const response = await fetch('/user/all');
// //     const body = await response.json();
// //     this.setState({users: body});
// //   }
  
// //   render() {
// //     const {users} = this.state;
// //     console.log("users",users);
// //     return (
// //         <div className="App">
// //           <header className="App-header">
// //             <img src={logo} className="App-logo" alt="logo" />
// //             <div className="App-intro">
// //               <h2>Users</h2>
// //               {users.map(user =>
// //                   <div key={user.id}>
// //                     {user.firstName} ({user.lastName}) <br />
// //                     {user.email}
// //                   </div>
// //               )}
// //             </div>
// //           </header>
// //         </div>
// //     );
// //   }
// // }

// // export default App;
// import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import AddUser from "./components/AddUser";
// import User from "./components/User";
// import UsersList from "./components/UsersList";

// function App() {
//   return (
//     <Router>
//       <nav className="navbar navbar-expand navbar-dark bg-dark">
//         <a href="/users" className="navbar-brand">
//           Orchestrateur de Test
//         </a>
//         <div className="navbar-nav mr-auto">
//           <li className="nav-item">
//             <Link to={"/users"} className="nav-link">
//               Users
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to={"/add"} className="nav-link">
//               Add
//             </Link>
//           </li>
//         </div>
//       </nav>
//       <div className="container mt-3">
//         <Switch>
//           <Route exact path={["/", "/users"]} component={UsersList} />
//           <Route exact path="/add" component={AddUser} />
//           <Route path="/users/:id" component={User} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }
// export default App;