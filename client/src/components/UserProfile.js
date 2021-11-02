import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
import "./UserProfile.css";
import NavBar from "./NavBar";
import ProfileMap from "./ProfileMap";

class UserProfile extends React.Component {
  state = {
    longitude: "",
    latitude: "",
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
        loading: false,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="UserProfile">
        {/* {this.state.redirectProfile ? <Redirect to="/userprofile"></Redirect> : ""} */}

        <NavBar></NavBar>
        <div class="mb-3">
          <input type="text" class="form-control" name="theLongitude" id="longitude" value={this.state.longitude} />
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" name="theLatitude" id="latitude" value={this.state.latitude} />
        </div>
        <div className="profileMap">
          <ProfileMap></ProfileMap>
        </div>
        {/* <div className="profileBody">
          <div className="profileMap">
            <ProfileMap></ProfileMap>
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
        </div> */}
      </div>
    );
  }
}

export default UserProfile;