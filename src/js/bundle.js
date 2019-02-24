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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("if (!Element.prototype.matches) {\n  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;\n}\n\nif (!Element.prototype.closest) {\n  Element.prototype.closest = function (s) {\n    var el = this;\n\n    do {\n      if (el.matches(s)) return el;\n      el = el.parentElement || el.parentNode;\n    } while (el !== null && el.nodeType === 1);\n\n    return null;\n  };\n}\n\nvar throttle = function throttle(func, limit) {\n  var inThrottle;\n  return function () {\n    var args = arguments;\n    var context = this;\n\n    if (!inThrottle) {\n      func.apply(context, args);\n      inThrottle = true;\n      setTimeout(function () {\n        return inThrottle = false;\n      }, limit);\n    }\n  };\n};\n\nconsole.log('Touch device: ' + ('ontouchstart' in document.documentElement));\nvar isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);\nvar isTouchDevice = 'ontouchstart' in document.documentElement;\n\nif (!isIE && !isTouchDevice) {\n  var cards = [].slice.call(document.querySelectorAll('.card')),\n      rotateFactor = 0.07; // set how big rotation should be\n\n  var isHovered = false;\n\n  var runCardAnimation = function runCardAnimation(e) {\n    if (!isHovered) {\n      isHovered = true;\n      var target = e.target.closest('.card__inner') || e.target.children[0],\n          cardOffsetTop = target.parentNode.offsetTop,\n          cardOffsetLeft = target.parentNode.offsetLeft,\n          cardWidth = target.offsetWidth,\n          cardHeight = target.offsetHeight;\n      var rY, rX;\n\n      var setCardPosition = function setCardPosition(e) {\n        if (target) {\n          rX = -(e.pageY - cardOffsetTop - cardHeight / 2).toFixed(2) * rotateFactor;\n          rY = (e.pageX - cardOffsetLeft - cardWidth / 2).toFixed(2) * rotateFactor;\n          target.style.transform = \"rotateX(\".concat(rX, \"deg) rotateY(\").concat(rY, \"deg)\");\n        }\n      };\n\n      target.addEventListener('mousemove', throttle(setCardPosition, 200));\n    }\n  };\n\n  var resetCardAnimation = function resetCardAnimation(e) {\n    var card = e.target.closest('.card__inner') || e.target.children[0];\n    card.style = '';\n    isHovered = false;\n  };\n\n  cards.forEach(function (card) {\n    return card.addEventListener('mouseenter', runCardAnimation);\n  });\n  cards.forEach(function (card) {\n    return card.addEventListener('mouseleave', resetCardAnimation);\n  });\n}\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });