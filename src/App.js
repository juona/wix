import React from "react";
import Node from "./Node";
import AddButton from "./AddButton";
import initialTree from "./initial.tree";
import IterativeTreeBuilder from "./iterative.builder";
import RecursiveTreeBuilder from "./recursive.builder";

const treeBuilders = {
  Recursive: RecursiveTreeBuilder,
  Iterative: IterativeTreeBuilder
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addNewNode = this.addNewNode.bind(this);
    this.addRootNode = this.addRootNode.bind(this);
    this.selectTreeBuilder = this.selectTreeBuilder.bind(this);
    this.state = {
      tree: initialTree,
      selectedTreeBuilder: "None"
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

  selectTreeBuilder(event) {
    this.setState({
      selectedTreeBuilder: event.target.value
    });
  }

  getTreeBuilder() {
    return new treeBuilders[this.state.selectedTreeBuilder]({
			create: this.createComponentNode.bind(this)
		});
	}
	
	getTree() {
		const treeBuilder = this.getTreeBuilder();
		const startTime = Date.now();		
		const tree = treeBuilder.build(this.state.tree);
		const executionTime = Date.now() - startTime;
		return {
			tree,
			executionTime
		};
	}

  createComponentNode(index, node, children) {
    return (
      <Node key={index} node={node} onNewNodeAdded={this.addNewNode}>
        {children}
      </Node>
    );
  }

  createBuilderButton(value, label) {
    return (
      <label>
        <input type="button" value={value} onClick={this.selectTreeBuilder} />
        {label}
      </label>
    );
  }

  render() {
		let treeAndAddButton;
		let rowStyle = { paddingTop: "10px" };
		
		if (this.state.selectedTreeBuilder !== "None") {
			let treeData = this.getTree();
			treeAndAddButton = [
				<div key="0" style={rowStyle}>
					{treeData.tree}
				</div>,
				<div style={rowStyle} key="1">
					<AddButton onAdd={this.addRootNode} label="New Root Node" />
				</div>,
				<div style={rowStyle} key="2">
					Algorithm took roughly {treeData.executionTime} ms to execute.
				</div>
			];
		}
		
    return (
      <div>
        <section>
					{this.createBuilderButton("None")}
          {this.createBuilderButton("Recursive")}
          {this.createBuilderButton("Iterative")}
        </section>

        {treeAndAddButton}
      </div>
    );
  }
}
