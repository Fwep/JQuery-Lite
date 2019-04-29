class DOMNodeCollection {
  constructor(HTMLEl) {
    this.nodes = HTMLEl;
  }

  html(str = null) {
    if (str) {
      this.nodes.forEach(node => node.innerHTML = `${str}`);
      return this.nodes;
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.nodes.forEach(node => node.innerHTML ="");
  }

  append(arg) {
    let args = Array.from(arguments);
      this.nodes.forEach(node => {
        args.forEach(insNode => {
          if (insNode instanceof DOMNodeCollection) { 
            // O(this.nodes.length * O(DOMNodCollection.nodes.length))
            this.appendDOMNodeCollection(node, insNode);
          } else if (arg instanceof HTMLElement) {
            node.innerHTML += arg.outerHTML;
          } else if (typeof arg == 'string') {
            node => node.innerHTML += arg;
          }
        });
      });
      return this.nodes;
  }

  appendDOMNodeCollection(node, collection) {
      collection.nodes.forEach(insNode => {
        node.innerHTML += String(insNode.outerHTML);
      });
  }
}

module.exports = DOMNodeCollection;