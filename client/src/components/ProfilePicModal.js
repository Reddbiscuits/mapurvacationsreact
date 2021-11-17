import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
import UploadPic from "./UploadPic";
// import "./SignUp.css";

class ProfilePicModal extends React.Component {
  state = {
    username: "",
    password: "",
    redirect: false,
    redirectProfile: false,
  };

  
  render() {
    return (
      <div className="SignUp">
        {this.state.redirectProfile ? <Redirect to="/userprofile"></Redirect> : ""}
        <div className="modal fade" id="picModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" id="proPicContent">
            <button type="button" class="btn-close" id="proPicBtnClose" data-bs-dismiss="modal" aria-label="Close"></button>
            <UploadPic></UploadPic>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePicModal;
