import React from "react";
import axios from "axios";

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      selectedFiles: null,
      progress: null
    };
  }
  fileSelectedHandler = event => {
    console.log(event.target.files);
    this.setState({
      selectedFiles: event.target.files
    });
  };

  fileUploadHandler = () => {
    const headers = {
      Accept: "multipart/form-data"
    };
    for (const file of this.state.selectedFiles) {
      const fd = new FormData();
      fd.append("file", file, file.name);
      axios
        .post(
          "http://localhost:8765/bulkweather/bulkInsert/upload",
          fd,
          headers
        )
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="del-body">
        <input
          style={{ display: "none" }}
          type="file"
          onChange={this.fileSelectedHandler}
          ref={this.fileInput}
          multiple
        />
        <button
          onClick={() => this.fileInput.current.click()}
          className="lg-cta del-btn"
        >
          Select file
        </button>
        <button onClick={this.fileUploadHandler} className="lg-cta del-btn">
          Upload
        </button>
        {this.state.progress}
      </div>
    );
  }
}

export default UploadFile;
