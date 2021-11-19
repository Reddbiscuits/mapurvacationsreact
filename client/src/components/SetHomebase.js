import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
import "./SetHomebase.css";
import NavBar from "./NavBar";
import HomeBaseMap from "./HomeBaseMap";

class SetHomebase extends React.Component {
  state = {
    username: "",
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
  componentDidMount() {
    axios.get("/checkuser").then((res) => {
      this.setState({
        username: res.data.userDoc.username,
      });
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    let name = document.querySelector("#homebasename").value;
    let long = document.querySelector("#longitude").value;
    let lat = document.querySelector("#latitude").value;
    axios.post("/save-home-base", { homebaseName: name, longitude: long, latitude: lat }).then(() => {
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
        <div class="welcomeText">
          <img src="../profilePhotoPlaceholder.png" className="profilePic" alt="profilePic" />
          <h1>Welcome {this.state.username}</h1>
        </div>
        <div className="homeBaseBody">
          <div className="card" id="hbCard">
            <div className="card-body">
              <h3>INSTRUCTIONS</h3>
              <hr></hr>
              <p>1) Use the Map's SEARCH function to look for your Home Base; i.e. street address, city, state, country, etc.</p>
              <br></br>
              <p>2) Click on your desired location from the list</p>
              <br></br>
              <p>3) Then click "Save Your Home Base"</p>
              <br></br>
              {/* <p>4) Once a Marker is set, you can click on it and Upload photos from your trip and View them in the Gallery</p> */}
            </div>
          </div>
          <div className="baseMap">
            <HomeBaseMap></HomeBaseMap>
          </div>
          <form class="loginFields">
            <div className="saveBaseBtn">
              <button type="submit" class="btn btn-outline-primary" onClick={this.submitHandler}>
                Save Your Home Base
              </button>
            </div>
            <div class="hbInput">
              <input type="text" class="hbInput" readOnly name="newName" id="homebasename" />
            </div>
            <div class="hbInput">
              <input type="text" class="form-control" name="theLongitude" id="longitude" />
            </div>
            <div class="hbInput">
              <input type="text" class="form-control" name="theLatitude" id="latitude" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SetHomebase;
