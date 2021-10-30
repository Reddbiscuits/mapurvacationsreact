import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
import "./NavBar.css";

class NavBar extends React.Component {
  state = {
    redirect: false,
  };

  // // generic change handler for text input fields
  // changeHandler = (e) => {
  //   let currentName = e.target.name;

  //   let newState = {};
  //   newState[currentName] = e.target.value; // newState['title'] / newState['description']

  //   this.setState(newState);
  // };

  // // class property syntax
  // submitHandler = () => {
  //   axios.post("/login", { username: this.state.username, password: this.state.password }).then((resp) => {
  //     let data = resp.data;

  //     let message = data.message
  //     let user = data.user;

  //     this.props.logInTheUser(user);
  //     this.setState({
  //       redirect: true,
  //     });
  //   });
  // };

  render() {
    return (
      <div className="navigation">
        <nav className="navBar">
          <div class="iconImg">
            <img id="icon" src="../icon.png" alt="" />
            <img id="name" class="iconImg" src="../name.png" alt="" />
          </div>

          {/* <form action="/" method="GET" class="form">
            <button type="submit" class="search-button">
              <img class="mag-glass" src="../magnifying-glass.png" alt="mag-glass" />
            </button>
            <input type="search" placeholder="Search Users" class="search-field" class="house" />
            <button type="submit" class="search-click">
              Search
            </button>
          </form> */}

          <div>
            <a href="/register" class="house">
              <button type="button" class="btn btn-outline-light">
                Create an Account
              </button>
            </a>

            <a href="/login" class="house">
              <button type="button" class="btn btn-outline-light">
                Login
              </button>
            </a>
            <a href="/" class="house">
              <button type="button" class="btn btn-outline-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                  <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                </svg>
              </button>
            </a>
            <button
              class="btn btn-outline-light house"
              class="btn btn-secondary dropdown-toggle"
              class="gear"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-wide" viewBox="0 0 16 16">
                <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z" />
              </svg>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" href="#">
                  logout
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#" action="/users/{{this._id}}/delete" method="post">
                  <form action="/users/{{this._id}}/delete" method="post"></form>delete
                </a>
              </li>
              {/* {{!-- <form action="/movies/{{this._id}}/delete" method="post"><button>Delete Movie</button></form> --}} */}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
