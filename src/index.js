const DOMNodeCollection = require('./dom_node_collection');

window.$l = (arg) => {
  if (typeof arg == 'string') { // We are then passed a CSS selector to identify nodes
    let nodeList = Array.from(document.querySelectorAll(`${arg}`));
    return new DOMNodeCollection(nodeList);
  } else if (arg instanceof HTMLElement) {
    let nodeList = [document.getElementsByTagName(`${arg}`)];
    return new DOMNodeCollection(nodeList);
  }
};