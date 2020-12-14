import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class EnterOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.pairPeers(this.state.otp);
    this.setState({
      otp: "",
    });
  }

  render() {
    return (
      <>
        <span className="instruction">
          Enter OTP from the other device here
        </span>
        {this.props.peerConnection ? (
          <Redirect to="/connected" />
        ) : (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="otp">
              <input
                type="text"
                name="otp"
                id="otp"
                onChange={this.handleChange}
                value={this.state.otp}
                // placeholder="Enter OTP"
              />
            </label>
            <input type="submit" value="PAIR" />
          </form>
        )}
      </>
    );
  }
}
