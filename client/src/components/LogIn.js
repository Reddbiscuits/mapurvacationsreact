import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
import "./LogIn.css";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    redirectHomeBase: false,
    redirectProfile: false,
  };

  // generic change handler for text input fields
  changeHandler = (e) => {
    let currentName = e.target.name;

    let newState = {};
    newState[currentName] = e.target.value; // newState['title'] / newState['description']

    this.setState(newState);
  };

  // class property syntax
  submitHandler = (event) => {
    event.preventDefault()
    axios.post("/login", { username: this.state.username, password: this.state.password }).then((resp) => {
      let data = resp.data;

      let errorMessage = data.errorMessage;
      let user = data.user;

      this.props.logInTheUser(user);

      if (errorMessage) {
        alert(errorMessage);
      } else {
        if (user.latitude && user.longitude) {
          this.setState({
            redirectProfile: true,
          });
        } else {
          this.setState({
            redirectHomeBase: true,
          });
        }
      }
    });
  };

  render() {
    return (
      <div className="Login">
        {this.state.redirectProfile ? <Redirect to="/userprofile"></Redirect> : ""}
        {this.state.redirectHomeBase ? <Redirect to="/sethomebase"></Redirect> : ""}
        <form onSubmit={this.submitHandler}>
        <div class="mb-3">
          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="username" name="username" value={this.state.username} onChange={this.changeHandler} />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            id="formGroupExampleInput2"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
        </div>
        <div className="loginBtn">
          <button type="submit" class="btn btn-outline-primary" onClick={this.submitHandler}>
            Log In
          </button>
        </div>
        </form>
      </div>
    );
  }
}

export default Login;
