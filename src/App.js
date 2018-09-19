import React from "react";
import Node from "./Node";
import AddButton from "./AddButton";
import initialTree from "./initial.tree";

export default class AppIterative extends React.Component {
  constructor(props) {
    super(props);
		this.addNewNode = this.addNewNode.bind(this);
		this.addRootNode = this.addRootNode.bind(this);
    this.state = {
      tree: initialTree
    };
	}
	
	addRootNode(newNodeName) {
		this.state.tree.push({
			name: newNodeName
		});
		this.setState(this.state);
	}

  addNewNode(parentNode, newNodeName) {
    parentNode.children = parentNode.children || [];
    parentNode.children.push({
      name: newNodeName
    });
    this.setState(this.state);
  }

  iterateNodes(nodes) {
    return nodes.map((node, index) => {
      if (node.children) {
        return this.createNodeComponent(index, node, this.iterateNodes(node.children));
      } else {
        return this.createNodeComponent(index, node);
      }
    });
  }

  createNodeComponent(index, node, children) {
    return (
      <Node key={index} node={node} onNewNodeAdded={this.addNewNode}>
        {children}
      </Node>
    );
  }

  render() {
    return (
      <div>
        <div>{this.iterateNodes(this.state.tree)}</div>
        <div style={{paddingTop: "10px"}}>
          <AddButton onAdd={this.addRootNode} label="New Root Node"/>
        </div>
      </div>
    );
  }
}
