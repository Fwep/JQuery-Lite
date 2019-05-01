class DOMNodeCollection {
  constructor(HTMLEl) {
    this.nodes = HTMLEl;
  }

  each(cb) {
    this.nodes.forEach(cb);
  }

  html(str = null) {
    if (str) {
      this.each(node => node.innerHTML = `${str}`);
      return this.nodes;
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.each(node => node.innerHTML =""); // Can refactor to this.html('');
  }

  append(arg) {
    let args = Array.from(arguments);
      this.each(node => {
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

  addClass(...classNames) {
    this.each(node => node.classList.add(...classNames));
  }
  
  removeClass(...classNames) {
    this.each(node => node.classList.remove(...classNames));
  }

  children() {
    let nodeList = [];
    this.each(node => {
      Array.from(node.children).forEach(child => nodeList.push(child));
    });

    return new DOMNodeCollection(nodeList);
  }
  
  parent() {
    let nodeList = [];
    this.each(({parentNode}) => { // Destructure parentNode property of each node
      if (!parentNode.visited) {
        nodeList.push(parentNode);
        parentNode.visited = true;
      }
    });

    nodeList.forEach(node => {
      node.visited = false;
    });
  
    return new DOMNodeCollection(nodeList);
  }

  find(selector) {
   let nodeList = [];
   this.each(node => {
    let matchedNodes = document.querySelectorAll(selector);
    nodeList = nodeList.concat(Array.from(matchedNodes));
   }) 

   return new DOMNodeCollection(nodeList);
  }

  remove() {
    this.each(node => node.remove());
  }

  on(event, handler) {
    this.each(node => {
      node.addEventListener(event, handler);
      node.event? node.event = [handler] : node.push(handler);
    });
  }

  off(event) {
    this.each(node => {
      if (node.event) {
        node.event.forEach(handler => {
          node.removeEventListener(event, handler);
        })
      }
    });
  }
}

module.exports = DOMNodeCollection;