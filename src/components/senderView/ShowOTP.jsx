import React, { Component } from "react";
import Connecting from "../commonView/Connecting";
import { Spring } from "react-spring/renderprops";

export default class ShowOTP extends Component {
  componentDidMount() {
    this.props.requestOTP();
    this.props.initiator(true);
  }

  render() {
    return (
      <>
        {this.props.peerConnection ? (
          <>
            <h2>Connecting to device</h2>
            <span className="instruction">OTP verified</span>
            <Connecting peerConnection={this.props.peerConnection} />
          </>
        ) : (
          <>
            <h2>Device pairing</h2>
            <span className="instruction">
              Enter this OTP on your other device
            </span>
            <Spring
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ delay: 200 }}
            >
              {(props) => (
                <h1 style={props} className="otp">
                  {this.props.otp}
                </h1>
              )}
            </Spring>
            <button className="refresh-otp" onClick={this.props.requestOTP}>
              Refresh OTP
            </button>
          </>
        )}
      </>
    );
  }
}
