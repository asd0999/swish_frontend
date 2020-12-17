import React, { Component } from "react";

export default class SendLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      linkInput: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeLinkInput = this.changeLinkInput.bind(this);
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
    this.changeLinkInput();
  }

  changeLinkInput() {
    if (!this.state.linkInput) {
      this.setState({
        linkInput: true,
      });
    } else {
      this.setState({
        linkInput: false,
      });
    }
  }

  render() {
    return (
      <>
        {this.state.linkInput ? (
          <form className="linkToSend-form" onSubmit={this.handleSubmit}>
            <label htmlFor="link" className="linkToSend-label">
              <input
                type="text"
                name="link"
                id="link"
                onChange={this.handleChange}
                value={this.state.link}
              />
            </label>
            <div>
              <button onClick={this.changeLinkInput}>CANCEL</button>
              <input type="submit" value="SEND" />
            </div>
          </form>
        ) : (
          <div className="shareLink" onClick={this.changeLinkInput}>
            Share link
          </div>
        )}
      </>
    );
  }
}
