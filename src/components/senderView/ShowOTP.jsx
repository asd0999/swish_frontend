import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class ShowOTP extends Component {
  componentDidMount() {
    this.props.requestOTP();
    this.props.initiator(true);
  }

  render() {
    return (
      <>
        <span className="instruction">Enter this OTP on your other device</span>
        {this.props.peerConnection ? (
          <Redirect to="/connected" />
        ) : (
          <>
            <h1 className="otp">{this.props.otp}</h1>
            <button className="refresh-otp" onClick={this.props.requestOTP}>
              Refresh OTP
            </button>
          </>
        )}
      </>
    );
  }
}
