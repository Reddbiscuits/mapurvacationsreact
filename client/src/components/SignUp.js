import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
import "./SignUp.css";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    redirect: false,
  };

  // generic changehandler for text input fields
  changeHandler = (e) => {
    let currentName = e.target.name;

    let newState = {};
    newState[currentName] = e.target.value;

    this.setState(newState);
  };

  submitHandler = (event) => {
    event.preventDefault();
    axios.post("/signup", { username: this.state.username, password: this.state.password }).then(() => {
      // alert('user created')
      this.setState({
        redirect: true,
      });
    });

    // Reset
    this.setState({
      username: "",
      password: "",
    });
  };

  render() {
    return (
      <div className="SignUp">
        {this.state.redirect ? <Redirect to=""></Redirect> : ""}
        <div className="modal fade" id="signupModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={this.submitHandler}>
                <div className="mb-3">
                  <div className="Username">
                    <label for="" class="form-label">
                      Enter Username
                    </label>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <input type="text" className="form-control" placeholder="username" name="username" value={this.state.username} onChange={this.changeHandler}></input>
                </div>
                <div className="mb-3">
                  <label for="" class="form-label">
                    Enter Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.changeHandler}
                  ></input>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={this.submitHandler}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <form onSubmit={this.submitHandler}>
        <input type="text" name="username" value={this.state.username} onChange={this.changeHandler}></input>
        <input type="text" name="password" value={this.state.password} onChange={this.changeHandler}></input>
        <button onClick={this.submitHandler}>Submit</button>
      </form> */}
      </div>
    );
  }
}

export default SignUp;
