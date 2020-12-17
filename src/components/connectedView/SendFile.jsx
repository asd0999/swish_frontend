import React, { Component } from "react";
import Connecting from "../commonView/Connecting";

export default class SendFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transferingFile: false,
    };
    this.clearFile = this.clearFile.bind(this);
    this.fileUploaded = this.fileUploaded.bind(this);
    this.triggerSendFile = this.triggerSendFile.bind(this);
    this.resetTransferingFile = this.resetTransferingFile.bind(this);
  }

  clearFile() {
    console.log("file cleared");
    document.getElementById("select-file-input").value = "";
    let f = document.querySelector(".custom-file-input");
    f.setAttribute("id", "");
    this.props.resetFile();
  }

  triggerSendFile() {
    this.props.sendFile();
    this.setState({
      transferingFile: true,
    });
    let f = document.querySelector(".custom-file-input");
    f.setAttribute("id", "");
  }

  fileUploaded(event) {
    this.props.selectFile(event);
    let f = document.querySelector(".custom-file-input");
    f.setAttribute("id", "file-uploaded");
  }

  resetTransferingFile() {
    this.setState({
      transferingFile: false,
    });
  }

  componentWillReceiveProps(props) {
    // console.log("triggered function", props);
    if (!props.file) {
      this.resetTransferingFile();
    }
  }

  render() {
    return (
      <>
        <>
          {this.props.file ? (
            this.state.transferingFile ? (
              <Connecting
                peerConnection={this.props.peerConnection}
                // resetFile={this.props.resetFile}
                // resetTransferingFile={this.resetTransferingFile}
                // clearFile={this.clearFile}
              />
            ) : (
              <>
                <label
                  htmlFor="select-file-input"
                  className="custom-file-input"
                  id="file-uploaded"
                >
                  <div id="fileIcon">
                    <img src="../file-icon.png" alt="file icon" />
                  </div>
                  <span>{this.props.file.name && this.props.file.name}</span>
                </label>
                <div id="dialog-footer">
                  <button
                    id="cancel-button"
                    className="cancel-button"
                    onClick={this.clearFile}
                  >
                    Cancel
                  </button>
                  <button id="ok-button" onClick={this.triggerSendFile}>
                    Send
                  </button>
                </div>
              </>
            )
          ) : (
            <label
              htmlFor="select-file-input"
              className="custom-file-input"
              onClick={this.props.showFileInput}
            >
              Share file
            </label>
          )}
        </>
        {/* {this.props.fileTransferComplete ? (
          <label
            htmlFor="select-file-input"
            className="custom-file-input"
            onClick={this.props.showFileInput}
          >
            Share file
          </label>
        ) : null} */}
        <input
          type="file"
          id="select-file-input"
          onChange={(event) => {
            this.fileUploaded(event);
          }}
        />
      </>
    );
  }
}
