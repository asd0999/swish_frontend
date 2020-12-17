import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Connecting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
    };
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.animate(this);
  }

  animate(self) {
    const loader = document.querySelector(".loader");
    const check = document.querySelector(".check");
    loader.classList.add("active");

    loader.addEventListener("animationend", function () {
      self.props.peerConnection ? (
        <>
          {check.classList.add("active")}
          {setTimeout(() => {
            self.setState({
              done: true,
            });
          }, 1000)}
        </>
      ) : (
        <>
          {check.classList.remove("active")}
          {loader.classList.add("active")}
        </>
      );
    });
  }

  render() {
    return (
      <div>
        {this.state.done ? (
          (this.resetTransferingFile && this.resetTransferingFile(),
          this.resetFile && this.resetFile(),
          (<Redirect to="/connected" />))
        ) : (
          <>
            <div className="loader">
              <div className="check">
                <span className="check-one"></span>
                <span className="check-two"></span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
