import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
         <header className="jumbotron">
           <h3>Profile</h3>
           <h4>
             <strong>Hi {currentUser.username} !</strong> 
           </h4>
        </header>
        {/* <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.toString()}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p> */}
        <p>
          <strong>Employee Id:</strong>{" "}
           {currentUser.id}
        </p>
        <p>
          <strong>Name: </strong>{" "}
          {currentUser.firstName + " "+ currentUser.lastName}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
          <strong>Contact:</strong>{" "}
          {currentUser.mobileNo}
        </p>
        <p>
          <strong>Join Date:</strong>{" "}
          {currentUser.joinDate}
        </p>
        <strong>Authorities:</strong>
        <p>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </p>
      </div>: null}
      </div>
    );
  }
}
