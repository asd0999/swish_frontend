import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Choice extends Component {
  render() {
    return (
      <div>
        {this.props.peerConnection ? (
          <>
            <p>You are still connected to the paired device</p>
            <button onClick={this.props.refreshPage}>CONNECT NEW DEVICE</button>
            <Link to="/connected">
              <button>BACK TO PAIRED DEVICE</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/send">
              <button>SEND</button>
            </Link>
            <Link to="/receive">
              <button>RECEIVE</button>
            </Link>
          </>
        )}
      </div>
    );
  }
}
