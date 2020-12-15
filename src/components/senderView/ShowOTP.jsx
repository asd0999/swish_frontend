import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import Connecting from "../commonView/Connecting";
// import PageHeading from "../commonView/PageHeading";
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
            <h2> OTP verified</h2>
            <span className="instruction"> Setting up P2P connection</span>
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
