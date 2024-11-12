const getPathFromChildToParent = (parent, child) => {
  let currentNode = child;
  const pathArray = [];
  while (parent !== currentNode) {
    const parentNode = currentNode.parentElement;
    const childrenArray = Array.from(parentNode.children);
    pathArray.push(childrenArray.indexOf(currentNode));
    currentNode = parentNode;
  }
  return pathArray.reverse();
};

const getValueFromPath = (path, parent) => {
  let currentNode = parent;
  while (path.length) {
    currentNode = currentNode.children[path.pop()];
  }
  return currentNode.innerText;
};

const findNodeValue = () => {
  const rootA = document.getElementById("rootA");
  const nodeA = document.getElementById("nodeA"); // find the path from this element to all the way to the root // we need to start from the leaf node
  const rootB = document.getElementById("rootB");
  const path = getPathFromChildToParent(rootA, nodeA);
  return getValueFromPath(path, rootB);
};

console.log(findNodeValue());
