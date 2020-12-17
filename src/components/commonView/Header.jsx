import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";
import { Redirect } from "react-router-dom";

export default class Header extends Component {
  // constructor(props) {
  //   super(props);
  //   this.disconnect = this.disconnect.bind(this);
  // }

  // disconnect() {
  //   // this.props.resetState();
  //   <Redirect to="/" />;
  // }

  render() {
    return (
      <div className="heading">
        <Spring
          from={{ opacity: 0, marginLeft: -100 }}
          to={{ opacity: 1, marginLeft: 20 }}
          config={{ duration: 600 }}
        >
          {(props) => (
            <div style={props}>
              <h1>SW</h1>
            </div>
          )}
        </Spring>
        {this.props.peerConnection ? (
          <Spring
            from={{ opacity: 0, marginRight: -100 }}
            to={{ opacity: 1, marginRight: 8 }}
            config={{ delay: 3600, duration: 500 }}
          >
            {(props) => (
              // <div style={props}>
              <button
                id="disconnect"
                onClick={this.props.refreshPage}
                style={props}
              >
                DISCONNECT
              </button>
            )}
          </Spring>
        ) : null}
      </div>
    );
  }
}
