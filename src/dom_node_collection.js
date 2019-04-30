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

  attr(prop, value) {
    let first = this.nodes[0];
    if (typeof prop == 'string') {
      if (value === undefined) {
        return first.getAttribute(`${prop}`);
      } else if (typeof value === 'string' 
      || typeof value === 'number') {
        return first.setAttribute(prop, value);
      } else if (value === null) {
        return first.removeAttribute(prop);
      } else if (typeof value === 'function') {
        return first.setAttribute(prop, value());
      }
    } else if (typeof prop == 'object') {
      console.log(prop);
      for (let key in prop) {
        this.attr(String(key), prop[key]);
        return;
      }
    }
  }
}

module.exports = DOMNodeCollection;