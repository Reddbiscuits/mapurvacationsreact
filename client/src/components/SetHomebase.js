import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
import "./SetHomebase.css";
import NavBar from "./NavBar";
import HomeBaseMap from "./HomeBaseMap";

class SetHomebase extends React.Component {
  state = {
    redirect: false,
  };

  // generic changehandler for text input fields
  // changeHandler = (e) => {
  //   let currentName = e.target.name;

  //   let newState = {};
  //   newState[currentName] = e.target.value;

  //   this.setState(newState);
  // };

  // submitHandler = (event) => {
  //   event.preventDefault();
  //   axios.post("/signup", { username: this.state.username, password: this.state.password }).then(() => {
  //     // alert('user created')
  //     this.setState({
  //       redirect: true,
  //     });
  //   });
  // };

  render() {
    return (
      <div className="SetHomebase">
        {/* {this.state.redirect ? <Redirect to=""></Redirect> : ""} */}

        <NavBar></NavBar>
        <div className="homeBaseBody">
        <div className="baseMap">
          <HomeBaseMap></HomeBaseMap>
        </div>
        <form class="loginFields" action="/save-home-base" method="POST">
          <div class="mb-3">
            <input type="text" class="form-control" name="theLongitude" id="longitude formGroupExampleInput2" />
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" name="theLatitude" id="latitude formGroupExampleInput2" />
          </div>
          <div className="saveBaseBtn">
            <button type="submit" class="btn btn-outline-primary">
              Save Your Home Base
            </button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default SetHomebase;
