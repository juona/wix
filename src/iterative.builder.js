// The basic idea behind this algorithm:
// 1) iterate over an array of given nodes
// 2) for a given node, iterate over it's children before constructing a component for the node
// 3) when the children are constructed, continue with the following siblings of the given node

export default class IterativeTreeBuilder {
  constructor(nodeComponentFactory) {
    this.nodeComponentFactory = nodeComponentFactory;
  }

  createNodeComponent(parentIndices, currentIndex, currentNode, children) {
    return this.nodeComponentFactory.create(
      `${parentIndices.join("-")}-${currentIndex}`,
      currentNode,
      children
    );
  }

  build(tree) {
    let nodes = tree;
    let parentIndices = [];
    let parentNodes = [];
    let currentIndex = 0;
    let currentNode;
    let siblingNodeComponents = [];
    let componentsMemory = [];

    do {
      while (currentIndex < nodes.length) {
        currentNode = nodes[currentIndex];

        // If there are children, iterate over them right away
        // We need to construct leaf components BEFORE we can construct their parents
        if (currentNode.children) {
          // Save the iteration state of the current tree level
          parentIndices.push(currentIndex);
          parentNodes.push(nodes);
          componentsMemory.push(siblingNodeComponents);

          // Reset iteration for child nodes
          currentIndex = 0;
          nodes = currentNode.children;
          siblingNodeComponents = [];
        } else {
          // Create a leaf component
          siblingNodeComponents.push(
            this.createNodeComponent(parentIndices, currentIndex, currentNode)
          );
          currentIndex++;
        }
      }

      // Whenever execution reaches this point we can be sure that:
      //  - the branch we are currently at is fully constructed
      //  - all preceding sibling branches in the PARENT branch have already been fully constructed
      // We need to do the following:
      //  - insert the tree we have just constructed (siblingNodeComponents) into the corresponding parent node
      //  - step out to the parent branch and continue with its iteration

      // Root branch does not have parent branches, so a guard is necessary
      if (parentIndices.length) {
        // Save the constructed React branch into a temp variable
        // We would otherwise lose it after stepping out to the previous tree branch
        let childNodeComponents = siblingNodeComponents;

        // Step out to the previous tree branch (restore previous iteration state)
        nodes = parentNodes.pop();
        currentIndex = parentIndices.pop();
        currentNode = nodes[currentIndex];
        siblingNodeComponents = componentsMemory.pop();

        // Create a node component with all its children
        siblingNodeComponents.push(
          this.createNodeComponent(parentIndices, currentIndex, currentNode, childNodeComponents)
        );
      }

      currentIndex++;

      // Either we have more nodes in this branch or at least one more parent branch to work with
    } while (currentIndex < nodes.length || parentIndices.length);

    return siblingNodeComponents;
  }
}
