import React from "react";

export default class AddNodeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			text: ""
		};
    this.displayPrompt = this.displayPrompt.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.execute = this.execute.bind(this);
  }

  displayPrompt() {
    this.setState({
      isPromptVisible: !this.state.isPromptVisible
    });
  }

  execute() {
    if (this.isNodeNameValid()) {
      this.props.onAdd(this.state.text);
      this.setState({
        isPromptVisible: false,
        text: ""
      });
    }
  }

  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  isNodeNameValid() {
    if (!this.state.text) {
      alert("Please enter something!");
      return false;
    } else {
      return true;
    }
  }

  render() {
		const promptStyle = { display: this.state.isPromptVisible ? "inline" : "none" };
		const newNodeLabel = this.props.label || "New Node";
    return (
      <span style={{ paddingLeft: "5px" }}>
        <input type="button" value={newNodeLabel} onClick={this.displayPrompt} />
        <input
          value={this.state.text}
          onChange={this.handleTextChange}
          style={promptStyle}
        />
        <input type="button" value="+" onClick={this.execute} style={promptStyle} />
      </span>
    );
  }
}
