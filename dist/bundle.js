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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sortable = function () {
  var Sortable = function Sortable() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$target = _ref.target,
        target = _ref$target === undefined ? null : _ref$target;

    if (target === null || !(target instanceof HTMLElement)) return;

    this.parent = target;
    this.elems = target.children;

    this.initHandlers();
  };

  Sortable.prototype = function () {
    var _handlerMouseDown = function _handlerMouseDown(e) {
      this.target = e.target;
      this.avatar = this.target.cloneNode(true);

      document.onmousemove = _handlerMouseMove.bind(this);
    };

    var _handlerMouseUp = function _handlerMouseUp(e) {
      document.onmousemove = null;
      this.target.classList.remove("sortable-selected");
      this.avatar.remove();
      var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);
      relatedTarget = relatedTarget.closest("li");

      if (relatedTarget !== null && relatedTarget.parentNode.getAttribute("id") === this.parent.getAttribute("id")) {
        var temp1 = relatedTarget.nextSibling;
        var temp2 = this.target.nextSibling;

        this.parent.insertBefore(this.target, temp1);
        this.parent.insertBefore(relatedTarget, temp2);
      }
    };

    var _handlerMouseMove = function _handlerMouseMove(e) {
      this.target.parentNode.insertBefore(this.avatar, this.target);
      var shiftY = e.pageY - _getCoords(this.target.parentNode).top,
          top = shiftY - this.avatar.offsetHeight / 2,
          shiftX = e.pageX - _getCoords(this.target.parentNode).left,
          left = shiftX - this.avatar.offsetWidth / 2;

      this.avatar.style.top = top + "px";
      this.avatar.style.left = left + "px";
      this.target.classList.add("sortable-selected");
      this.avatar.classList.add("sortable-moved");
    };

    var _getCoords = function _getCoords(element) {
      var element = element.getBoundingClientRect();

      return {
        top: element.top,
        left: element.left
      };
    };

    var initHandlers = function initHandlers() {
      var _this = this;

      [].forEach.call(this.elems, function (elem) {
        elem.onmousedown = _handlerMouseDown.bind(_this);
      });
      this.parent.onmouseup = _handlerMouseUp.bind(this);
      document.ondragstart = function () {
        return false;
      };
    };

    return {
      initHandlers: initHandlers
    };
  }();

  return Sortable;
}();

var list1 = new Sortable({
  target: document.getElementById("list-1")
});
var list2 = new Sortable({
  target: document.getElementById("list-2")
});
var list3 = new Sortable({
  target: document.getElementById("list-3")
});
var list4 = new Sortable({
  target: document.getElementById("list-4")
});

/***/ })
/******/ ]);