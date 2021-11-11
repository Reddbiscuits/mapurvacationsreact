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
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Welcome to mapURvacation
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>First create an account (It's <b>free</b> and <b>easy</b>!)</p>
                <p>Then come back here and <b>Log In</b>.</p>
              </div>
              <div class="modal-footer">
                <div>
                  <img src="./mapMarkers.png"></img>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutModal;
