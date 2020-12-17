import React, { Component } from "react";
import Connecting from "../commonView/Connecting";
import VerifyOTP from "./VerifyOTP";

export default class EnterOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      verifyingOTP: false,
      wrongOnce: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log("now");
    if (this.props.wrongOTP) {
      this.setState({
        verifyingOTP: false,
      });
    }
  }

  handleClick(e) {
    e.target.placeholder = "";
    this.setState({
      verifyingOTP: false,
    });
    this.props.resetWrongOTP();
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.otp) {
      this.props.pairPeers(this.state.otp);
      this.setState({
        otp: "",
        verifyingOTP: true,
        wrongOnce: true,
      });
    }
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
            {this.props.wrongOTP ? (
              <>
                <span className="instruction">
                  Incorrect OTP, could not pair devices
                </span>
                <form onSubmit={this.handleSubmit}>
                  <label className="label-OTP-input" htmlFor="otp">
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      onClick={this.handleClick}
                      onChange={this.handleChange}
                      value={this.state.otp}
                      placeholder="Enter OTP"
                    />
                  </label>
                  <input id="pairBtn" type="submit" value="TRY AGAIN" />
                </form>
              </>
            ) : this.state.verifyingOTP ? (
              <>
                <span className="instruction">Verifying OTP</span>
                <VerifyOTP OTPaccepted={this.props.OTPaccepted} />
              </>
            ) : (
              <>
                {this.state.wrongOnce ? (
                  <span className="instruction">
                    Incorrect OTP, could not pair devices
                  </span>
                ) : (
                  <span className="instruction">
                    Enter OTP from the other device here
                  </span>
                )}
                <form onSubmit={this.handleSubmit}>
                  <label className="label-OTP-input" htmlFor="otp">
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      onClick={this.handleClick}
                      onChange={this.handleChange}
                      value={this.state.otp}
                      placeholder="Enter OTP"
                    />
                  </label>
                  {this.state.wrongOnce ? (
                    <input id="pairBtn" type="submit" value="TRY AGAIN" />
                  ) : (
                    <input id="pairBtn" type="submit" value="PAIR" />
                  )}
                </form>
              </>
            )}
          </>
        )}
      </>
    );
  }
}
