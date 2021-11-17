import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
import "./PhotoGallery.css";

class PhotoGallery extends React.Component {
  state = {
    image: String,
    loading: true,
  };

  // loadData = () => {
  //   axios.get("/locations/" + this.props.locationID).then((res) => {
  //     this.setState({
  //       loading: false,
  //       image: res.data.image,
  //     });
  //   });
  // };

  componentDidMount() {
    console.log("requesting ==> " + "/locations/" + this.props.locationID);
    axios.get("/locations/" + this.props.locationID).then((res) => {
      console.log("res.data ==> ", res.data);
      this.setState({
        loading: false,
        image: res.data.image,
      });
    });
  }

  // generic changehandler for text input fields
  // changeHandler = (e) => {
  //   let currentName = e.target.name;

  //   let newState = {};
  //   newState[currentName] = e.target.value;

  //   this.setState(newState);
  // };

  // submitHandler = (event) => {
  //   event.preventDefault();
  //   axios.post("/signup", { username: this.state.username, password: this.state.password }).then(() => {
  //     // alert('user created')
  //     this.setState({
  //       redirect: true,
  //     });
  //   });

  //   // Reset
  //   this.setState({
  //     username: "",
  //     password: "",
  //   });
  // };

  render() {
    const carousel = (
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={this.state.image} class="d-block w-100" alt="map" />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    );

    return (
      <div>
        <div className="PhotoGallery">
          {/* {this.state.redirect ? <Redirect to=""></Redirect> : ""} */}
          <div className="modal fade" id="galleryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">{this.state.loading ? <button onClick={this.loadData}>Load images</button> : carousel}</div>
            </div>
          </div>
          {/* <form onSubmit={this.submitHandler}>
        <input type="text" name="username" value={this.state.username} onChange={this.changeHandler}></input>
        <input type="text" name="password" value={this.state.password} onChange={this.changeHandler}></input>
        <button onClick={this.submitHandler}>Submit</button>
      </form> */}
        </div>
      </div>
    );
  }
}

export default PhotoGallery;
