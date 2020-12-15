import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";
import Choice from "./Choice";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="sub-heading">
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 1200, duration: 1000 }}
        >
          {(props) => (
            <div style={props}>
              <p>Share URLs and files between devices</p>
              <p>Password free</p>
              <p>Convinient</p>
              <p>Secure</p>
            </div>
          )}
        </Spring>
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ delay: 100, duration: 100 }}
        >
          {(props) => (
            <div className="choiceBtns" style={props}>
              <Choice
                peerConnection={this.props.peerConnection}
                refreshPage={this.props.refreshPage}
              />
            </div>
          )}
        </Spring>
      </div>
    );
  }
}
