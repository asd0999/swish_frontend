import React, { Component } from "react";
import SendLink from "./SendLink";
import SendFile from "./SendFile";
import { Redirect } from "react-router-dom";
import Inbox from "./Inbox";
import { Spring } from "react-spring/renderprops";

export default class DataTransfer extends Component {
  render() {
    return (
      <>
        {this.props.peerConnection ? (
          <>
            <div className="connection-animation">
              <div className="peer1"></div>
              <div className="peer2"></div>
            </div>

            <Spring
              from={{ opacity: 0, marginTop: -200 }}
              to={{ opacity: 1, marginTop: -4 }}
              config={{ delay: 200, duration: 400 }}
            >
              {(props) => (
                <div className="fileShare" style={props}>
                  <SendFile
                    selectFile={this.props.selectFile}
                    sendFile={this.props.sendFile}
                    resetFile={this.props.resetFile}
                    file={this.props.file}
                    fileTransferComplete={this.props.fileTransferComplete}
                    peerConnection={this.props.peerConnection}
                  />
                </div>
              )}
            </Spring>

            <div className="linkShare">
              <SendLink sendLink={this.props.sendLink} />
            </div>
            <div className="itemsReceived">
              <Inbox
                download={this.props.download}
                gotFile={this.props.gotFile}
                linkReceived={this.props.linkReceived}
              />
            </div>
          </>
        ) : (
          <Redirect to="/" />
        )}
      </>
    );
  }
}
