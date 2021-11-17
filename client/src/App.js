import React from "react";
import "./App.css";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { Route } from "react-router-dom";
import Login from "./components/LogIn";
import "bootstrap";
import SetHomebase from "./components/SetHomebase";
import UserProfile from "./components/UserProfile";

import AboutModal from "./components/AboutModal";
import UploadPic from "./components/UploadPic";
import ProfilePicModal from "./components/ProfilePicModal";

class App extends React.Component {
  state = {
    username: "",
    password: "",
    currentUser: this.props.user,
  };

  loginHandler = (userObj) => {
    this.setState({
      currentUser: userObj,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="AppBox">
          <Route exact path="/" render={() => <Home logInTheUser={this.loginHandler}></Home>}></Route>
          {/* <Home></Home> */}
          <Route exact path="/sethomebase" component={SetHomebase}></Route>
          <Route path="/userprofile" render={(props) => <UserProfile key={props.location.search}></UserProfile>}></Route>
          <SignUp></SignUp>
          <AboutModal></AboutModal>

          {/* <UploadPic></UploadPic> */}
        </div>
      </div>
    );
  }
}

export default App;
