import React, { Component } from "react";

export default class AboutInfo extends Component {
  render() {
    return (
      <div className="aboutInfo">
        <h1 id="title">SWISH</h1>
        <h2>
          <div id="el-pitch">
            Swish is a peer-to-peer application <br />
            that can be used to transfer files and URLs <br />
            between devices and/or peers
          </div>
          <div id="list">
            <p>Features:</p>
            <ul>
              <li>No password / login</li>
              <li>Secure OTP based pairing</li>
              <li>Encrypted transfer of data</li>
              <li>Data not saved anywhere</li>
            </ul>
          </div>
          <div id="startby">
            Start by pairing your devices. Generate an OTP on one device and
            enter it on the other. After transfer, click "disconnect" or simply
            refresh page to end connection.
          </div>
          <div id="more-info">
            <div id="icons"></div>
            Made with louu using Node + React
          </div>
        </h2>
      </div>
    );
  }
}
