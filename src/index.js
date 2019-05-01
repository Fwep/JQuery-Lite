const DOMNodeCollection = require('./dom_node_collection');
const callbacks = [];

window.$l = (arg) => {

  if (typeof arg == 'string') { // We are then passed a CSS selector to identify nodes
    let nodeList = Array.from(document.querySelectorAll(`${arg}`));
    return new DOMNodeCollection(nodeList);
  } else if (arg instanceof HTMLElement) {
    let nodeList = [document.getElementsByTagName(`${arg}`)];
    return new DOMNodeCollection(nodeList);
  } else if (typeof arg == 'function' ) {
    if (document.readyState == 'complete') {
      arg();
    } else {
      callbacks.push(arg);
    }
  }
};

$l.extend = function(...args) {
  let merged = args[0];
  args.forEach(obj => {
    for (key in obj) {
      merged[key] = obj[key];
    }
  });

  return merged;
}

$l.ajax = function(options) {
  defaults = {
    success: data => {
      console.log(data);
    },
    error: () => console.error("You done goofed"),
    url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b',
    method: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  $l.extend(defaults, options);

  const request = new XMLHttpRequest();
  request.open(defaults.method, defaults.url);
  request.setRequestHeader("Content-Type", defaults.contentType)
  request.onload = defaults.success;
  request.send(JSON.stringify(defaults.data));
}

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  callbacks.forEach(cb => cb());
})