import React from "react";
import AddButton from "./AddButton";

export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayPrompt = this.displayPrompt.bind(this);
    this.handleNodeNameChange = this.handleNodeNameChange.bind(this);
    this.addNewNode = this.addNewNode.bind(this);
  }

  displayPrompt() {
    this.setState({
      isPromptVisible: !this.state.isPromptVisible
    });
  }

  addNewNode(newNodeName) {
    this.props.onNewNodeAdded(this.props.node, newNodeName);
  }

  handleNodeNameChange(event) {
    this.setState({
      newNodeName: event.target.value
    });
  }

  isNodeNameValid() {
    if (!this.state.newNodeName) {
      alert("Please enter a node name!");
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div style={{ paddingLeft: "10px" }}>
        - <span className="node-name">{this.props.node.name}</span>
        <AddButton onAdd={this.addNewNode} />
        {this.props.children}
      </div>
    );
  }
}
