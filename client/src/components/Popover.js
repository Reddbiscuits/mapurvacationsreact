import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
import "./SignUp.css";

class Popover extends React.Component {
  state = {
    username: "",
    password: "",
    redirect: false,
  };


  render() {
    return (
      <div className="popover">
        <button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover">
              Popover on bottom
            </button>
      </div>
    );
  }
}

export default Popover;

