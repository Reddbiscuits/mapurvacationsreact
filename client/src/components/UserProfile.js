import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
import "./UserProfile.css";
import NavBar from "./NavBar";
import ProfileMap from "./ProfileMap";

class UserProfile extends React.Component {
  state = {
    name: "",
    longitude: "",
    latitude: "",
    locations: [],
    redirectHomeBase: false,
    redirectProfile: false,
    loading: true,
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
      // res.data.message
      // alert('user created')
      this.setState({
        redirectProfile: true,
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
        <div className="profileBody">
          <div class="welcomeText">{/* <h1>Welcome { theUsername }</h1> */}</div>
          <div class="mb-3">
            <input type="text" class="hbInput" name="theName" id="name" value={this.state.name} />
          </div>
          <div class="mb-3">
            <input type="text" class="hbInput" name="theLongitude" id="longitude" value={this.state.longitude} />
          </div>
          <div class="mb-3">
            <input type="text" class="hbInput" name="theLatitude" id="latitude" value={this.state.latitude} />
          </div>
          <div className="profileMap">
            <ProfileMap></ProfileMap>
          </div>
          <form class="loginFields" action="/save-new-loc" method="POST">
            <div class="mb-3">
              <input type="text" class="form-control" name="newName" id="newname" />
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" name="newLongitude" id="newlongitude" />
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" name="newLatitude" id="newlatitude" />
            </div>
            <div class="saveNewLocBtn">
              <button type="submit" class="btn btn-outline-primary" onClick={this.submitHandler}>
                Save New Location
              </button>
            </div>
          </form> 
        </div>
        <br></br>
        <div clasName="locTable">
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
    );
  }
}

export default UserProfile;

{/* <table>
              <thead>
                <tr>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Popularity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.contacts.map((contact) => {
                  return (
                    <tr key={contact.id}>
                      <td>
                        <img src={contact.pictureUrl} style={{ width: "30px" }} className="imgShadow"/>
                      </td>
                      <td>{contact.name}</td>
                      <td>{contact.popularity}</td>
                      <td>
                        <button onClick={() => this.delete(contact.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table> */}