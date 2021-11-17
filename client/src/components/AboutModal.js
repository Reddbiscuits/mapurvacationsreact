import React from "react";
// import axios from "axios";
// import { Redirect } from "react-router-dom";
import "bootstrap";
import "./AboutModal.css";

class AboutModal extends React.Component {
  state = {
    username: "",
    password: "",
    redirect: false,
  };

  render() {
    return (
      <div className="AboutModal">
        <div class="modal fade" id="aboutModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" id="aboutDialog">
            <div class="modal-content" id="aboutContent">
              <div class="modal-header" id="aboutHeader">
                <h5 class="modal-title" id="aboutTitle">
                  Welcome to mapURvacation
                </h5>
                <button type="button" class="btn-close" id="aboutBtnClose" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" id="aboutBody">
                <p>First create an account (It's <b>free</b> and <b>easy</b>!)</p>
                <p>Then come back here and <b>Log In</b>.</p>
              </div>
              <div class="modal-footer" id="aboutFooter">
              <p>Then you're ready to</p>
                <div className="aboutMaps">
                  <p>Set Markers</p>
                  <img src="./mapMarkers.png" id="aboutImage"></img>
                </div>
                <div>
                  <p>and</p>
                </div>
                <div className="aboutMaps">
                <p>Connetct the dots</p>
                <img src="./mapLines.png" id="aboutImage"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutModal;
