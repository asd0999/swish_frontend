import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";

export default class Header extends Component {
  render() {
    return (
      <div className="heading">
        <Spring
          from={{ opacity: 0, marginLeft: -100 }}
          to={{ opacity: 1, marginLeft: 20 }}
          config={{ duration: 1200 }}
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
            config={{ delay: 4000, duration: 800 }}
          >
            {(props) => (
              // <div style={props}>
              <button
                id="disconnect"
                style={props}
                onClick={this.props.refreshPage}
              >
                DISCONNECT
              </button>
              // </div>
            )}
          </Spring>
        ) : null}
      </div>
    );
  }
}
