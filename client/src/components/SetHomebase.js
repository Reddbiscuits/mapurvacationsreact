import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
import "./SetHomebase.css";
import NavBar from "./NavBar";
import HomeBaseMap from "./HomeBaseMap";

class SetHomebase extends React.Component {
  state = {
    longitude: "",
    latitude: "",
    redirectHomeBase: false,
    redirectProfile: false,
  };

  // generic changehandler for text input fields
  // changeHandler = (e) => {
  //   let currentName = e.target.name;

  //   let newState = {};
  //   newState[currentName] = e.target.value;

  //   this.setState(newState);
  // };

  submitHandler = (event) => {
    event.preventDefault();
    let long = document.querySelector("#longitude").value
    let lat = document.querySelector("#latitude").value
    axios.post("/save-home-base", { longitude: long, latitude: lat }).then(() => {
      // alert('user created')
      this.setState({
        redirectProfile: true,
      });
    });
  };

  render() {
    return (
      <div className="SetHomebase">
        {this.state.redirectProfile ? <Redirect to="/userprofile"></Redirect> : ""}

        <NavBar></NavBar>
        <div className="homeBaseBody">
          <div className="baseMap">
            <HomeBaseMap></HomeBaseMap>
          </div>
          <form class="loginFields">
            <div class="mb-3">
              <input type="text" class="form-control" name="theLongitude" id="longitude" />
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" name="theLatitude" id="latitude" />
            </div>
            <div className="saveBaseBtn">
              <button type="submit" class="btn btn-outline-primary" onClick={this.submitHandler}>
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
