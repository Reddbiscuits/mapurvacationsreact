import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
import "./UserProfile.css";
import NavBar from "./NavBar";
import ProfileMap from "./ProfileMap";
import GalleryUpload from "./GalleryUpload";
import ProfilePicModal from "./ProfilePicModal";
import PhotoGallery from "./PhotoGallery";

class UserProfile extends React.Component {
  state = {
    longitude: "",
    latitude: "",
    locations: [],
    redirectHomeBase: false,
    redirectProfile: false,
    loading: true,
    username: "",
    homebaseName: "",
    profilePic: "",
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
        longitude: res.data.userDoc.longitude,
        latitude: res.data.userDoc.latitude,
        username: res.data.userDoc.username,
        homebaseName: res.data.userDoc.homebaseName,
        profilePic: res.data.userDoc.pictureUrl,
      });
      axios.get("/locations").then((locs) => {
        this.setState({
          locations: locs.data.locationResults,
          loading: false,
        });
      });
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    let name = document.querySelector("#newname").value;
    let long = document.querySelector("#newlongitude").value;
    let lat = document.querySelector("#newlatitude").value;
    axios.post("/save-new-loc", { newName: name, newLongitude: long, newLatitude: lat }).then((res) => {
      axios.get("/locations").then((locs) => {
        this.setState({
          locations: locs.data.locationResults,
        });
      });
    });
  };

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="UserProfile">
        {this.state.redirectProfile ? <Redirect to="/userprofile"></Redirect> : ""}

        <NavBar></NavBar>
        <ProfilePicModal></ProfilePicModal>
        <div class="welcomeText">
          <img src={this.state.profilePic} className="profilePic" alt="profilePic" />
          <h1>Welcome {this.state.username}</h1>
        </div>
        <div className="profileBody">
          <div class="mb-3">
            <input type="text" class="hbInput" name="theName" id="homebaseName" readOnly value={this.state.homebaseName} />
          </div>
          <div class="mb-3">
            <input type="text" class="hbInput" name="theLongitude" id="longitude" readOnly value={this.state.longitude} />
          </div>
          <div class="mb-3">
            <input type="text" class="hbInput" name="theLatitude" id="latitude" readOnly value={this.state.latitude} />
          </div>
          <div className="profileMap">
            <ProfileMap key={this.state.locations.length}></ProfileMap>
          </div>
          <form class="newLocFields" action="/save-new-loc" method="POST">
            <div class="saveNewLocBtn">
              <button type="submit" class="btn btn-outline-primary" onClick={this.submitHandler}>
                Save New Location
              </button>
            </div>
            <div class="mb-3">
              <input type="text" class="hbInput" readOnly name="newName" id="newname" />
            </div>
            <div class="mb-3">
              <input type="text" class="hbInput" readOnly name="newLongitude" id="newlongitude" />
            </div>
            <div class="mb-3">
              <input type="text" class="hbInput" readOnly name="newLatitude" id="newlatitude" />
            </div>
          </form>
        </div>
        <br></br>
        <GalleryUpload></GalleryUpload>
        
        <div className="locMarkers">
          {this.state.locations.map((location, idx) => {
            return (
              <div>
                <input type="text" class="hbInput" readOnly id={"loc-id-" + idx} value={location._id} />
                <input type="text" class="hbInput" readOnly id={"loc-name-" + idx} value={location.name} />
                <input type="text" class="hbInput" readOnly id={"loc-longitude-" + idx} value={location.longitude} />
                <input type="text" class="hbInput" readOnly id={"loc-latitude-" + idx} value={location.latitude} />
              </div>
            );
          })}
        </div>
        <div clasName="card">
          <div className="card-body">
            <table class="destination-table" cellpadding="0" cellspacing="0">
              <thead>
                <tr>
                  <th>
                    <b>Location</b>
                  </th>
                  <th>
                    <b>Longitude</b>
                  </th>
                  <th>
                    <b>Latitude</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.locations.map((location) => {
                  return (
                    <tr key={location.id}>
                      <td>{location.name}</td>
                      <td>{location.longitude}</td>
                      <td>{location.latitude}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
