/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\r\n  constructor(HTMLEl) {\r\n    this.nodes = HTMLEl;\r\n  }\r\n\r\n  each(cb) {\r\n    this.nodes.forEach(cb);\r\n  }\r\n\r\n  html(str = null) {\r\n    if (str) {\r\n      this.each(node => node.innerHTML = `${str}`);\r\n      return this.nodes;\r\n    } else {\r\n      return this.nodes[0].innerHTML;\r\n    }\r\n  }\r\n\r\n  empty() {\r\n    this.each(node => node.innerHTML =\"\"); // Can refactor to this.html('');\r\n  }\r\n\r\n  append(arg) {\r\n    let args = Array.from(arguments);\r\n      this.each(node => {\r\n        args.forEach(insNode => {\r\n          if (insNode instanceof DOMNodeCollection) { \r\n            // O(this.nodes.length * O(DOMNodCollection.nodes.length))\r\n            this.appendDOMNodeCollection(node, insNode);\r\n          } else if (arg instanceof HTMLElement) {\r\n            node.innerHTML += arg.outerHTML;\r\n          } else if (typeof arg == 'string') {\r\n            node => node.innerHTML += arg;\r\n          }\r\n        });\r\n      });\r\n      return this.nodes;\r\n  }\r\n\r\n  appendDOMNodeCollection(node, collection) {\r\n      collection.nodes.forEach(insNode => {\r\n        node.innerHTML += String(insNode.outerHTML);\r\n      });\r\n  }\r\n\r\n  attr(prop, value) {\r\n    let first = this.nodes[0];\r\n    if (typeof prop == 'string') {\r\n      if (value === undefined) {\r\n        return first.getAttribute(`${prop}`);\r\n      } else if (typeof value === 'string' \r\n      || typeof value === 'number') {\r\n        return first.setAttribute(prop, value);\r\n      } else if (value === null) {\r\n        return first.removeAttribute(prop);\r\n      } else if (typeof value === 'function') {\r\n        return first.setAttribute(prop, value());\r\n      }\r\n    } else if (typeof prop == 'object') {\r\n      console.log(prop);\r\n      for (let key in prop) {\r\n        this.attr(String(key), prop[key]);\r\n        return;\r\n      }\r\n    }\r\n  }\r\n\r\n  addClass(...classNames) {\r\n    this.each(node => node.classList.add(...classNames));\r\n  }\r\n  \r\n  removeClass(...classNames) {\r\n    this.each(node => node.classList.remove(...classNames));\r\n  }\r\n\r\n  children() {\r\n    let nodeList = [];\r\n    this.each(node => {\r\n      Array.from(node.children).forEach(child => nodeList.push(child));\r\n    });\r\n\r\n    return new DOMNodeCollection(nodeList);\r\n  }\r\n  \r\n  parent() {\r\n    let nodeList = [];\r\n    this.each(({parentNode}) => { // Destructure parentNode property of each node\r\n      if (!parentNode.visited) {\r\n        nodeList.push(parentNode);\r\n        parentNode.visited = true;\r\n      }\r\n    });\r\n\r\n    nodeList.forEach(node => {\r\n      node.visited = false;\r\n    });\r\n  \r\n    return new DOMNodeCollection(nodeList);\r\n  }\r\n\r\n  find(selector) {\r\n   let nodeList = [];\r\n   this.each(node => {\r\n    let matchedNodes = document.querySelectorAll(selector);\r\n    nodeList = nodeList.concat(Array.from(matchedNodes));\r\n   }) \r\n\r\n   return new DOMNodeCollection(nodeList);\r\n  }\r\n\r\n  remove() {\r\n    this.each(node => node.remove());\r\n  }\r\n\r\n  on(event, handler) {\r\n    this.each(node => {\r\n      node.addEventListener(event, handler);\r\n      node.event? node.event = [handler] : node.push(handler);\r\n    });\r\n  }\r\n\r\n  off(event) {\r\n    this.each(node => {\r\n      if (node.event) {\r\n        node.event.forEach(handler => {\r\n          node.removeEventListener(event, handler);\r\n        })\r\n      }\r\n    });\r\n  }\r\n}\r\n\r\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\r\nconst callbacks = [];\r\n\r\nwindow.$l = (arg) => {\r\n\r\n  if (typeof arg == 'string') { // We are then passed a CSS selector to identify nodes\r\n    let nodeList = Array.from(document.querySelectorAll(`${arg}`));\r\n    return new DOMNodeCollection(nodeList);\r\n  } else if (arg instanceof HTMLElement) {\r\n    let nodeList = [document.getElementsByTagName(`${arg}`)];\r\n    return new DOMNodeCollection(nodeList);\r\n  } else if (typeof arg == 'function' ) {\r\n    if (document.readyState == 'complete') {\r\n      arg();\r\n    } else {\r\n      callbacks.push(arg);\r\n    }\r\n  }\r\n};\r\n\r\n$l.extend = function(...args) {\r\n  let merged = args[0];\r\n  args.forEach(obj => {\r\n    for (key in obj) {\r\n      merged[key] = obj[key];\r\n    }\r\n  });\r\n\r\n  return merged;\r\n}\r\n\r\n$l.ajax = function(options) {\r\n  defaults = {\r\n    success: data => {\r\n      console.log(data);\r\n    },\r\n    error: () => console.error(\"You done goofed\"),\r\n    url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b',\r\n    method: 'GET',\r\n    data: {},\r\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\r\n  };\r\n\r\n  $l.extend(defaults, options);\r\n\r\n  const request = new XMLHttpRequest();\r\n  request.open(defaults.method, defaults.url);\r\n  request.setRequestHeader(\"Content-Type\", defaults.contentType)\r\n  request.onload = defaults.success;\r\n  request.send(JSON.stringify(defaults.data));\r\n}\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n  docReady = true;\r\n  callbacks.forEach(cb => cb());\r\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });