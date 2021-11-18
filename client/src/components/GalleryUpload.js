import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap";
// import UploadPic from "./UploadPic";
// import "./SignUp.css";

class GalleryUpload extends React.Component {
  state = {
    file: null,
    redirectProfile: false,
  };

  uploadFile = (event) => {
    this.setState({
      file: event.target.files[0],
      loading: true,
    });
  };

  saveHandler = () => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", this.state.file);

    axios.post("/upload", uploadData).then((resp) => {
      console.log(resp.data);
      axios.post("/save-gallery-url/" + document.querySelector("#currentlySelectedLoc").value, { pictureUrl: resp.data.file_url }).then(() => {
        this.setState({
          redirectProfile: true,
          loading: false,
        });
        window.location.reload();
      });
    });
  };

  render() {
    return (
      <div className="SignUp">
        <h1>{this.state.loading && "wait for image upload"}</h1>
        {this.state.redirectProfile ? <Redirect to="/userprofile"></Redirect> : ""}
        <div className="modal fade" id="galleryUpload" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <button type="button" class="btn-close" id="aboutBtnClose" data-bs-dismiss="modal" aria-label="Close"></button>
              <input type="file" className="btn btn-outline-primary" onChange={this.uploadFile} />
              <button onClick={this.saveHandler} className="btn btn-primary" data-bs-dismiss="modal">
                Save Image
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GalleryUpload;
