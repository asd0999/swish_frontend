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
          config={{ delay: 600, duration: 600 }}
        >
          {(props) => (
            <div style={props}>
              <h2 className="by-line">
                Sharing across devices
                <br />
                Made simple{" "}
              </h2>
            </div>
          )}
        </Spring>
        <Spring
          from={{ opacity: 0, marginTop: -20 }}
          to={{ opacity: 1, marginTop: 4 }}
          config={{ delay: 800, duration: 300 }}
        >
          {(props) => (
            <>
              {/* <p style={props}>Get started!</p> */}
              <div className="choiceBtns" style={props}>
                <Choice
                  peerConnection={this.props.peerConnection}
                  refreshPage={this.props.refreshPage}
                />
              </div>
            </>
          )}
        </Spring>
      </div>
    );
  }
}
