import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";

export default class Header extends Component {
  render() {
    return (
      <div className="heading">
        <Spring
          from={{ opacity: 0, marginTop: -500 }}
          to={{ opacity: 1, marginTop: 0 }}
          config={{ duration: 1000 }}
        >
          {(props) => (
            <div style={props}>
              <h1>Swiiish</h1>
            </div>
          )}
        </Spring>
      </div>
    );
  }
}
