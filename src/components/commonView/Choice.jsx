import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Choice extends Component {
  render() {
    return (
      <>
        {this.props.peerConnection ? (
          <>
            <p>You are still connected to the paired device</p>
            <Link>
              <button className="newDeviceBtn" onClick={this.props.refreshPage}>
                CONNECT NEW DEVICE
              </button>
            </Link>
            <Link to="/connected">
              <button className="pairedDeviceBtn">BACK TO PAIRED DEVICE</button>
            </Link>
          </>
        ) : (
          <>
            <p>Get started!</p>
            <Link to="/generate-otp">
              <button className="sendBtn">GENERATE OTP</button>
            </Link>
            <Link to="/enter-otp">
              <button className="receiveBtn">ENTER OTP</button>
            </Link>
          </>
        )}
      </>
    );
  }
}
