// import logo from './logo.svg';
// import './App.css';
// import { Component } from 'react';

// class App extends Component{
//   state = {
//     users: []
//   };
  
//   async componentDidMount() {
//     const response = await fetch('/user/all');
//     const body = await response.json();
//     this.setState({users: body});
//   }
  
//   render() {
//     const {users} = this.state;
//     console.log("users",users);
//     return (
//         <div className="App">
//           <header className="App-header">
//             <img src={logo} className="App-logo" alt="logo" />
//             <div className="App-intro">
//               <h2>Users</h2>
//               {users.map(user =>
//                   <div key={user.id}>
//                     {user.firstName} ({user.lastName}) <br />
//                     {user.email}
//                   </div>
//               )}
//             </div>
//           </header>
//         </div>
//     );
//   }
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTutorial from "./components/AddUser";
import Tutorial from "./components/User";
import TutorialsList from "./components/UsersList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/users" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/users"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/users"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/users/:id" component={Tutorial} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;