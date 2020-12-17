import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";

export default class AboutInfo extends Component {
  render() {
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ delay: 1200, duration: 1800 }}
      >
        {(props) => (
          <div className="aboutInfo" style={props}>
            <h1 id="title">SWISH</h1>
            <hr />
            <h2>
              <div id="el-pitch">
                Swish is a peer-to-peer application that can be used to transfer
                files and URLs between devices and/or peers
              </div>
              <div id="list">
                <p>Features:</p>
                <ul>
                  <li>No password / login</li>
                  <li>Secure OTP based pairing</li>
                  <li>Encrypted data transfer</li>
                  <li>Data not saved on server</li>
                </ul>
              </div>
              <div id="startby">
                <h3>Start by pairing your devices</h3>
                <ol>
                  <li>
                    Generate an OTP on one device and enter it on the other{" "}
                  </li>
                  <li>
                    After transfer, click "disconnect" or simply refresh page
                  </li>
                </ol>
              </div>
              <div id="madewithlove">
                <div id="icons"></div>
                Made with louu using Node + React
              </div>
            </h2>
          </div>
        )}
      </Spring>
    );
  }
}
