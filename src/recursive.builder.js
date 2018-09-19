export default class RecursiveTreeBuilder {
	constructor(nodeComponentFactory) {
    this.nodeComponentFactory = nodeComponentFactory;
	}
	
	build(nodes) {
		return nodes.map((node, index) => {
			if (node.children) {
				return this.nodeComponentFactory.create(index, node, this.build(node.children));
			} else {
				return this.nodeComponentFactory.create(index, node);
			}
		});
	};
}
