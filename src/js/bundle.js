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

eval("var throttle = function throttle(func, limit) {\n  var inThrottle;\n  return function () {\n    var args = arguments;\n    var context = this;\n\n    if (!inThrottle) {\n      func.apply(context, args);\n      inThrottle = true;\n      setTimeout(function () {\n        return inThrottle = false;\n      }, limit);\n    }\n  };\n};\n\nvar cards = document.querySelectorAll('.card-wrap');\n\nvar runCardAnimation = function runCardAnimation(e) {\n  var target = e.target.closest('.card') || e.target.children[0];\n  var cardOffsetTop = target.parentNode.offsetTop;\n  var cardOffsetLeft = target.parentNode.offsetLeft;\n  var cardWidth = target.offsetWidth;\n  var cardHeight = target.offsetHeight;\n\n  var setCardPosition = function setCardPosition(e) {\n    console.log(e);\n\n    if (target) {\n      console.log(cardOffsetTop);\n      target.style.transform = \"\\n      rotateX(\".concat(-(e.pageY - cardOffsetTop - cardHeight / 2) * 0.1, \"deg) \\n      rotateY(\").concat((e.pageX - cardOffsetLeft - cardWidth / 2) * 0.12, \"deg)\\n    \");\n    }\n  };\n\n  target.addEventListener('mousemove', throttle(setCardPosition, 150));\n};\n\nvar destroyCardAnimation = function destroyCardAnimation(e) {\n  var card = e.target.closest('.card') || e.target.children[0];\n  console.log(card);\n  card.style.transform = 'rotate(0deg)';\n};\n\ncards.forEach(function (card) {\n  return card.addEventListener('mouseover', throttle(runCardAnimation, 150));\n});\ncards.forEach(function (card) {\n  return card.addEventListener('mouseleave', destroyCardAnimation);\n});\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });