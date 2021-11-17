import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class UploadPic extends React.Component {
  state = {
    file: null,
    redirectProfile: false,
  };

  uploadFile = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };

  saveHandler = () => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", this.state.file);

    axios.post("/upload", uploadData).then((resp) => {
      console.log(resp.data);
      axios.post("/save-picture-url", { pictureUrl: resp.data.file_url }).then(() => {
        this.setState({
          redirectProfile: true,
        });
      });
    });
  };

  render() {
    return (
      <div className="uploadField">
        {this.state.redirectProfile ? <Redirect to="/userprofile?reload"></Redirect> : ""}
        {this.state.redirectProfile ? <Redirect to="/userprofile"></Redirect> : ""}
        <input type="file" class="btn btn-outline-primary" onChange={this.uploadFile} />
        <br></br>
        <button className="btn btn-primary" onClick={this.saveHandler}>Save Image</button>
      </div>
    );
  }
}

export default UploadPic;
