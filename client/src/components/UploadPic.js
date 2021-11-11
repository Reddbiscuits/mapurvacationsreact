import React from "react";
import axios from "axios";

class UploadPic extends React.Component {
  state = {
    file: null,
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
        alert("upload and save in database -> done");
      });
    });
  };

  render() {
    return (
      <div className="App">
        <input type="file" onChange={this.uploadFile} />

        <button onClick={this.saveHandler}>Save Image</button>
      </div>
    );
  }
}

export default UploadPic;
