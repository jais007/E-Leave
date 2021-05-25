import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import ViewAllEmployees from "./components/ViewAllEmployees";
import ApplyLeave from "./components/ApplyLeave";
import ViewAllRequest from "./components/ViewAllRequest";
import MyRequests from "./components/MyRequests";
import ViewEmployeeById from "./components/ViewEmployeeById";
import ViewRequestByEmployeeById from "./components/ViewRequestByEmployeeId";
//import forgotPassword from "./components/forgotPassword";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      Role: "",
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      let userRole="";
      if(user.roles.includes("ROLE_ADMIN")) userRole="ADMIN";
      else if(user.roles.includes("ROLE_MOD")) userRole="MOD";
      else userRole="USER";
      this.setState({
        currentUser: user,
       // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        Role: userRole
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, Role } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            LMS
          </Link>
          <div className="navbar-nav mr-auto">
            
            {/* {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )} */}

            {(Role === "ADMIN" || Role === "MOD" )&& (
              <li className="nav-item">
                <Link to={"/requests"} className="nav-link">
                  Leave Requests
                </Link>
              </li>
            )}
            
            {(Role === "ADMIN" || Role === "MOD" ) && (
              <li className="nav-item">
                <Link to={"/employees"} className="nav-link">
                 All Employees 
                </Link>
               
              </li>
            )}
           
            {/* {!isAdmin && currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  Dashboard
                </Link>
              </li>
            )} */}

            {Role!=="ADMIN" && currentUser && (
              <li className="nav-item">
                <Link to={"/leave-request"} className="nav-link">
                  Apply Leave
                </Link>
              </li>
            )}    

            {Role!=="ADMIN" && currentUser && (
              <li className="nav-item">
                <Link to={"/my-requests"} className="nav-link">
                  My History
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
                <a href="/login" className="nav-link" onClick={this.logOut}>
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
            <Route exact path={["/", "/login"]} component={Login} />
            {/* <Route exact path="/login" component={Login} /> */}
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/leave-request" component={ApplyLeave} />
            <Route path="/employees" component={ViewAllEmployees} />
            {/* <Route path="/mod" component={BoardModerator} /> */}
            <Route path="/requests" component={ViewAllRequest} />
            <Route path="/my-requests" component={MyRequests} />
            <Route path="/view-application/:id" component={ViewEmployeeById} />
            <Route path="/view-request/:id" component={ViewRequestByEmployeeById} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
