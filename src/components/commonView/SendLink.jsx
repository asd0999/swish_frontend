import React, { Component } from "react";

export default class SendLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
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
    this.props.sendLink(this.state.link);
    this.setState({
      link: "",
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="link">
            <input
              type="text"
              name="link"
              id="link"
              onChange={this.handleChange}
              value={this.state.link}
            />
          </label>
          <input type="submit" value="SEND" />
        </form>
      </div>
    );
  }
}
