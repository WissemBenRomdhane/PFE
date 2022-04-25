import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardDeveloper from "./components/BoardDeveloper";
import BoardClient from "./components/BoardClient";
import BoardAdmin from "./components/BoardAdmin";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import { StyledEngineProvider } from '@mui/material/styles';
import Sidebar from "./components/Sidebar";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
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
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);
  const logOut = () => {
    dispatch(logout());
  };
  return (<Router history={history}>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/home"}>Orchestrateur de Test</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          {showModeratorBoard && (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Developer Board
                </Link>
              </li>
              </div>
            )}
            {showAdminBoard && (
              <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
              </div>
            )}
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <a href="/sign-in" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
        
        )}
          </div>
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardDeveloper} />
            <Route path="/client" component={BoardClient} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
      
      <Sidebar/>
  
      
    </div></Router>
    
  );
}

export default App;