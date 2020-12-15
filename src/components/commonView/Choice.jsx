import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Choice extends Component {
  render() {
    return (
      <div>
        {this.props.peerConnection ? (
          <>
            <p>You are still connected to the paired device</p>
            <button className="newDeviceBtn" onClick={this.props.refreshPage}>
              CONNECT NEW DEVICE
            </button>
            <Link to="/connected">
              <button className="pairedDeviceBtn">BACK TO PAIRED DEVICE</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/send">
              <button className="sendBtn">SEND</button>
            </Link>
            <Link to="/receive">
              <button className="receiveBtn">RECEIVE</button>
            </Link>
          </>
        )}
      </div>
    );
  }
}
