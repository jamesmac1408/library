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


var _drawer = __webpack_require__(1);

var _drawer2 = _interopRequireDefault(_drawer);

var _codeblock = __webpack_require__(6);

var _codeblock2 = _interopRequireDefault(_codeblock);

var _panel = __webpack_require__(8);

var _panel2 = _interopRequireDefault(_panel);

var _tabs = __webpack_require__(9);

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  ============ Initialisation ============
*/

$(document).ready(function () {
  var codeBlocks = document.querySelectorAll('.demo-code');
  for (var i = 0; i < codeBlocks.length; i += 1) {
    new _codeblock2.default(codeBlocks[i]);
  }

  var panels = document.querySelectorAll('.panel-container');
  for (var _i = 0; _i < panels.length; _i += 1) {
    new _panel2.default(panels[_i]);
  }

  var tabs = document.querySelectorAll('.tabs-container');
  for (var _i2 = 0; _i2 < tabs.length; _i2 += 1) {
    new _tabs2.default(tabs[_i2]);
  }

  var headerIcon = document.getElementById('headerIcon');
  var drawer = new _drawer2.default(document.getElementById('drawerContainer'));
  headerIcon.addEventListener('click', function () {
    drawer.toggle();
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ============ Drawer ============
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _contentsTable = __webpack_require__(2);

var _contentsTable2 = _interopRequireDefault(_contentsTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Drawer = function () {
  _createClass(Drawer, [{
    key: 'toggle',
    value: function toggle() {
      if (this.active) {
        this._hideDrawer();
      } else {
        this._showDrawer();
      }
    }
  }, {
    key: '_showDrawer',
    value: function _showDrawer() {
      this.active = true;
      this.drawerContainer.classList.add('in');
      var self = this;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          self.drawerContainer.classList.add('active');
          document.body.addEventListener('touchend', self._onBodyClick);
        });
      });
    }
  }, {
    key: '_removeDrawer',
    value: function _removeDrawer() {
      this.drawerContainer.removeEventListener('transitionend', this._removeDrawer);
      this.active = false;
      this.drawerContainer.classList.remove('in');
    }
  }, {
    key: '_hideDrawer',
    value: function _hideDrawer() {
      if (!this.active) {
        return;
      }

      document.body.removeEventListener('touchend', this._onBodyClick);
      this.drawerContainer.classList.remove('active');
      this.drawerContainer.addEventListener('transitionend', this._removeDrawer);
    }
  }, {
    key: '_onBodyClick',
    value: function _onBodyClick(evt) {
      if (!this.active) {
        return;
      }

      if (!this.drawer.contains(evt.target)) {
        this._hideDrawer();
      }
    }
  }, {
    key: '_addEvents',
    value: function _addEvents() {
      /* close drawer on clicking a link */
      var links = this.drawer.querySelectorAll('.collection-listItem a');
      for (var i = 0; i < links.length; i += 1) {
        links[i].addEventListener('click', this._hideDrawer);
      }
      window.addEventListener('resize', this._onScroll);
      window.addEventListener('hashchange', this._onScroll);
    }
  }]);

  function Drawer(el) {
    _classCallCheck(this, Drawer);

    this.drawerContainer = el;
    this.drawer = el.querySelector('.drawer');
    this.active = false;

    this._onBodyClick = this._onBodyClick.bind(this);
    this._hideDrawer = this._hideDrawer.bind(this);
    this._removeDrawer = this._removeDrawer.bind(this);

    var activeContents = document.querySelector('.collection-listItem.active');
    console.log(activeContents);
    if (activeContents) {
      this.activeContents = new _contentsTable2.default(activeContents);
    }

    this._addEvents();
  }

  return Drawer;
}();

exports.default = Drawer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // THIS CODE HAS GOTTEN MESSY, I KNOW
// TODO: Clean up

var _scrollManager = __webpack_require__(3);

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _constants = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableOfContents = function () {
  _createClass(TableOfContents, [{
    key: '_highlightTitles',
    value: function _highlightTitles(scrollTop) {
      var furthestTitle = 0;
      for (var i = 0; i < this.titles.length; i++) {
        var top = this.titles[i].offsetTop;
        if (scrollTop >= top - this.offsetInViewThreshold) {
          furthestTitle = i;
          this.links[i].classList.add('active');
        } else {
          this.links[i].classList.remove('active');
        }
      }
      this._updateScrollIndicator(scrollTop, furthestTitle);
    }
  }, {
    key: '_updateScrollIndicator',
    value: function _updateScrollIndicator(scrollTop, furthestTitle) {
      if (this.titles[furthestTitle]) {

        this.furthestTitle = furthestTitle;

        if (furthestTitle === this.titles.length - 1) {
          // if we're at at the list title in the contents table, set the next distance 
          // to the bottom of the content body
          this.nextElementDistance = this.component.offsetTop + this.component.offsetHeight - this.offsetInViewThreshold;
        } else {
          // else, set the next distance to the next title
          this.nextElementDistance = this.titles[furthestTitle + 1].offsetTop - this.offsetInViewThreshold;
        }

        // declare current element distance and clamp it >= 0
        this.currElementDistance = furthestTitle > 0 ? this.titles[furthestTitle].offsetTop - this.offsetInViewThreshold : 0;
      }

      // work out the distance scrolled
      var distance = scrollTop - this.currElementDistance;

      // work this out as a percentage of the distance between the current and next element distance
      var percentageDistanceTravelled = distance / (this.nextElementDistance - this.currElementDistance);
      percentageDistanceTravelled = percentageDistanceTravelled > 1 ? 1 : percentageDistanceTravelled;

      // work out height of the bar accordingly
      var extraHeight = this.heightMultiplier * percentageDistanceTravelled,
          height = this.heightMultiplier * furthestTitle + extraHeight;

      this.scrollIndicator.style.height = height + 'px';
    }
  }, {
    key: 'initialiseMaxHeight',
    value: function initialiseMaxHeight() {
      this.maxHeight = this.toc.offsetHeight + 'px';
      this.heightMultiplier = this.links[0].getBoundingClientRect().height;
    }
  }, {
    key: 'getComponent',
    value: function getComponent() {
      return this.component;
    }
  }, {
    key: '_scrollToTitle',
    value: function _scrollToTitle(index) {
      this.scrollManager.scrollTo(this.titles[index], 300);
    }
  }, {
    key: '_addEvents',
    value: function _addEvents() {
      this.scrollManager = new _scrollManager2.default(document.body, this._highlightTitles);

      var self = this;
      for (var i = 0; i < this.links.length; i += 1) {
        (function () {
          var k = i;
          self.links[k].addEventListener('click', function (e) {
            self._scrollToTitle(k);
            e.preventDefault();
          });
        })();
      }
    }
  }]);

  function TableOfContents(el) {
    _classCallCheck(this, TableOfContents);

    this.body = el;
    this.offsetInViewThreshold = _constants.IN_VIEW_THRESHOLD - document.querySelector('.main').offsetTop;
    this.component = document.querySelector('.component');
    this.scrollIndicator = this.body.querySelector('.scrollIndicator');
    this.toc = this.body.querySelector('.toc');

    this._scrollToTitle = this._scrollToTitle.bind(this);
    this._highlightTitles = this._highlightTitles.bind(this);

    this.furthestTitle = null;

    this.titles = [this.component.querySelector('.component-title')];
    this.links = this.body.querySelectorAll('a');
    for (var i = 1; i < this.links.length; i++) {
      var id = /.*#(.*)/.exec(this.links[i].getAttribute('href'))[1].replace('+', '\\+');
      this.titles = [].concat(_toConsumableArray(this.titles), [this.component.querySelector('#' + id)]);
    }

    this.initialiseMaxHeight();
    this._addEvents();
    this._highlightTitles(0);
  }

  return TableOfContents;
}();

exports.default = TableOfContents;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _smoothScrolling = __webpack_require__(4);

var _smoothScrolling2 = _interopRequireDefault(_smoothScrolling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollManager = function () {
  _createClass(ScrollManager, [{
    key: 'addHandler',
    value: function addHandler(handler) {
      this.handlers.push(handler);
    }
  }, {
    key: 'scrollTo',
    value: function scrollTo(target, duration) {
      (0, _smoothScrolling2.default)(this.scrollTarget, target, duration);
    }
  }, {
    key: '_fireHandlers',
    value: function _fireHandlers() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var handler = _step.value;

          handler(this.latestKnownScrollY);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.ticking = false;
    }
  }, {
    key: '_requestTick',
    value: function _requestTick() {
      var _this = this;

      if (!this.ticking) {
        requestAnimationFrame(function () {
          _this._fireHandlers();
        });
      }
      this.ticking = true;
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(scrollTop) {
      this.latestKnownScrollY = scrollTop;
      this._requestTick();
    }
  }, {
    key: '_addEvents',
    value: function _addEvents() {
      var _this2 = this;

      document.body.addEventListener('scroll', function (e) {
        _this2._onScroll(document.body.scrollTop);
      });
      if (this.scrollTarget !== document.body) {
        this.scrollTarget.addEventListener('scroll', function (e) {
          _this2._onScroll(_this2.scrollTarget.scrollTop);
        });
      }
      window.addEventListener('resize', this._onScroll);
      window.addEventListener('hashchange', this._onScroll);
    }
  }]);

  function ScrollManager(scrollTarget) {
    _classCallCheck(this, ScrollManager);

    this.scrollTarget = scrollTarget;

    for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      handlers[_key - 1] = arguments[_key];
    }

    this.handlers = handlers;
    this.ticking = false;

    this._onScroll = this._onScroll.bind(this);

    this._addEvents();
  }

  return ScrollManager;
}();

exports.default = ScrollManager;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function doScrolling(scrollTarget, element, duration) {
  var startingY = scrollTarget.scrollTop;
  var elementY = element.getBoundingClientRect().top;
  // If element is close to page's bottom then window will scroll only to some position above the element.
  var targetY = scrollTarget.scrollHeight - elementY < scrollTarget.offsetHeight ? scrollTarget.scrollHeight - scrollTarget.offsetHeight : elementY + scrollTarget.scrollTop;
  var diff = targetY - startingY;
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  var easing = function easing(t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  var start;

  if (!diff) return;

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    // Elapsed miliseconds since start of scrolling.
    var time = timestamp - start;
    // Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1);
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent);

    scrollTarget.scrollTop = startingY + diff * percent;

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

exports.default = doScrolling;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    IN_VIEW_THRESHOLD: 0
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ============ Code Block ============
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _clipboard = __webpack_require__(7);

var _clipboard2 = _interopRequireDefault(_clipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CodeBlock = function () {
  _createClass(CodeBlock, [{
    key: '_initialiseClipboard',
    value: function _initialiseClipboard() {
      var self = this;
      this.clipboard = new _clipboard2.default(this.btn, {
        text: function text(trigger) {
          return self.body.innerText;
        }
      });
    }
  }, {
    key: '_addEventListeners',
    value: function _addEventListeners() {
      this.clipboard.on('success', function (e) {
        el.querySelector('.demo-code--copy').classList.add('success');
        setTimeout(function () {
          el.querySelector('.demo-code--copy').classList.remove('success');
        }, 1500);
      });

      this.clipboard.on('error', function (e) {
        throw new Error(e);
      });
    }
  }]);

  function CodeBlock(el) {
    _classCallCheck(this, CodeBlock);

    this.body = el;
    this.btn = el.querySelector('.demo-code--copy');

    this._initialiseClipboard();
    this._addEventListeners();
  }

  return CodeBlock;
}();

exports.default = CodeBlock;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * clipboard.js v1.7.1
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
(function (f) {
    if (( false ? "undefined" : _typeof2(exports)) === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        var g;if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }g.Clipboard = f();
    }
})(function () {
    var define, module, exports;return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                    var n = t[o][1][e];return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }return n[o].exports;
        }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
            s(r[o]);
        }return s;
    }({ 1: [function (require, module, exports) {
            var DOCUMENT_NODE_TYPE = 9;

            /**
             * A polyfill for Element.matches()
             */
            if (typeof Element !== 'undefined' && !Element.prototype.matches) {
                var proto = Element.prototype;

                proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
            }

            /**
             * Finds the closest parent that matches a selector.
             *
             * @param {Element} element
             * @param {String} selector
             * @return {Function}
             */
            function closest(element, selector) {
                while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
                    if (typeof element.matches === 'function' && element.matches(selector)) {
                        return element;
                    }
                    element = element.parentNode;
                }
            }

            module.exports = closest;
        }, {}], 2: [function (require, module, exports) {
            var closest = require('./closest');

            /**
             * Delegates event to a selector.
             *
             * @param {Element} element
             * @param {String} selector
             * @param {String} type
             * @param {Function} callback
             * @param {Boolean} useCapture
             * @return {Object}
             */
            function delegate(element, selector, type, callback, useCapture) {
                var listenerFn = listener.apply(this, arguments);

                element.addEventListener(type, listenerFn, useCapture);

                return {
                    destroy: function destroy() {
                        element.removeEventListener(type, listenerFn, useCapture);
                    }
                };
            }

            /**
             * Finds closest match and invokes callback.
             *
             * @param {Element} element
             * @param {String} selector
             * @param {String} type
             * @param {Function} callback
             * @return {Function}
             */
            function listener(element, selector, type, callback) {
                return function (e) {
                    e.delegateTarget = closest(e.target, selector);

                    if (e.delegateTarget) {
                        callback.call(element, e);
                    }
                };
            }

            module.exports = delegate;
        }, { "./closest": 1 }], 3: [function (require, module, exports) {
            /**
             * Check if argument is a HTML element.
             *
             * @param {Object} value
             * @return {Boolean}
             */
            exports.node = function (value) {
                return value !== undefined && value instanceof HTMLElement && value.nodeType === 1;
            };

            /**
             * Check if argument is a list of HTML elements.
             *
             * @param {Object} value
             * @return {Boolean}
             */
            exports.nodeList = function (value) {
                var type = Object.prototype.toString.call(value);

                return value !== undefined && (type === '[object NodeList]' || type === '[object HTMLCollection]') && 'length' in value && (value.length === 0 || exports.node(value[0]));
            };

            /**
             * Check if argument is a string.
             *
             * @param {Object} value
             * @return {Boolean}
             */
            exports.string = function (value) {
                return typeof value === 'string' || value instanceof String;
            };

            /**
             * Check if argument is a function.
             *
             * @param {Object} value
             * @return {Boolean}
             */
            exports.fn = function (value) {
                var type = Object.prototype.toString.call(value);

                return type === '[object Function]';
            };
        }, {}], 4: [function (require, module, exports) {
            var is = require('./is');
            var delegate = require('delegate');

            /**
             * Validates all params and calls the right
             * listener function based on its target type.
             *
             * @param {String|HTMLElement|HTMLCollection|NodeList} target
             * @param {String} type
             * @param {Function} callback
             * @return {Object}
             */
            function listen(target, type, callback) {
                if (!target && !type && !callback) {
                    throw new Error('Missing required arguments');
                }

                if (!is.string(type)) {
                    throw new TypeError('Second argument must be a String');
                }

                if (!is.fn(callback)) {
                    throw new TypeError('Third argument must be a Function');
                }

                if (is.node(target)) {
                    return listenNode(target, type, callback);
                } else if (is.nodeList(target)) {
                    return listenNodeList(target, type, callback);
                } else if (is.string(target)) {
                    return listenSelector(target, type, callback);
                } else {
                    throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
                }
            }

            /**
             * Adds an event listener to a HTML element
             * and returns a remove listener function.
             *
             * @param {HTMLElement} node
             * @param {String} type
             * @param {Function} callback
             * @return {Object}
             */
            function listenNode(node, type, callback) {
                node.addEventListener(type, callback);

                return {
                    destroy: function destroy() {
                        node.removeEventListener(type, callback);
                    }
                };
            }

            /**
             * Add an event listener to a list of HTML elements
             * and returns a remove listener function.
             *
             * @param {NodeList|HTMLCollection} nodeList
             * @param {String} type
             * @param {Function} callback
             * @return {Object}
             */
            function listenNodeList(nodeList, type, callback) {
                Array.prototype.forEach.call(nodeList, function (node) {
                    node.addEventListener(type, callback);
                });

                return {
                    destroy: function destroy() {
                        Array.prototype.forEach.call(nodeList, function (node) {
                            node.removeEventListener(type, callback);
                        });
                    }
                };
            }

            /**
             * Add an event listener to a selector
             * and returns a remove listener function.
             *
             * @param {String} selector
             * @param {String} type
             * @param {Function} callback
             * @return {Object}
             */
            function listenSelector(selector, type, callback) {
                return delegate(document.body, selector, type, callback);
            }

            module.exports = listen;
        }, { "./is": 3, "delegate": 2 }], 5: [function (require, module, exports) {
            function select(element) {
                var selectedText;

                if (element.nodeName === 'SELECT') {
                    element.focus();

                    selectedText = element.value;
                } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
                    var isReadOnly = element.hasAttribute('readonly');

                    if (!isReadOnly) {
                        element.setAttribute('readonly', '');
                    }

                    element.select();
                    element.setSelectionRange(0, element.value.length);

                    if (!isReadOnly) {
                        element.removeAttribute('readonly');
                    }

                    selectedText = element.value;
                } else {
                    if (element.hasAttribute('contenteditable')) {
                        element.focus();
                    }

                    var selection = window.getSelection();
                    var range = document.createRange();

                    range.selectNodeContents(element);
                    selection.removeAllRanges();
                    selection.addRange(range);

                    selectedText = selection.toString();
                }

                return selectedText;
            }

            module.exports = select;
        }, {}], 6: [function (require, module, exports) {
            function E() {
                // Keep this empty so it's easier to inherit from
                // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
            }

            E.prototype = {
                on: function on(name, callback, ctx) {
                    var e = this.e || (this.e = {});

                    (e[name] || (e[name] = [])).push({
                        fn: callback,
                        ctx: ctx
                    });

                    return this;
                },

                once: function once(name, callback, ctx) {
                    var self = this;
                    function listener() {
                        self.off(name, listener);
                        callback.apply(ctx, arguments);
                    };

                    listener._ = callback;
                    return this.on(name, listener, ctx);
                },

                emit: function emit(name) {
                    var data = [].slice.call(arguments, 1);
                    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                    var i = 0;
                    var len = evtArr.length;

                    for (i; i < len; i++) {
                        evtArr[i].fn.apply(evtArr[i].ctx, data);
                    }

                    return this;
                },

                off: function off(name, callback) {
                    var e = this.e || (this.e = {});
                    var evts = e[name];
                    var liveEvents = [];

                    if (evts && callback) {
                        for (var i = 0, len = evts.length; i < len; i++) {
                            if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
                        }
                    }

                    // Remove event from queue to prevent memory leak
                    // Suggested by https://github.com/lazd
                    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

                    liveEvents.length ? e[name] = liveEvents : delete e[name];

                    return this;
                }
            };

            module.exports = E;
        }, {}], 7: [function (require, module, exports) {
            (function (global, factory) {
                if (typeof define === "function" && define.amd) {
                    define(['module', 'select'], factory);
                } else if (typeof exports !== "undefined") {
                    factory(module, require('select'));
                } else {
                    var mod = {
                        exports: {}
                    };
                    factory(mod, global.select);
                    global.clipboardAction = mod.exports;
                }
            })(this, function (module, _select) {
                'use strict';

                var _select2 = _interopRequireDefault(_select);

                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule ? obj : {
                        default: obj
                    };
                }

                var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
                    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
                } : function (obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
                };

                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }

                var _createClass = function () {
                    function defineProperties(target, props) {
                        for (var i = 0; i < props.length; i++) {
                            var descriptor = props[i];
                            descriptor.enumerable = descriptor.enumerable || false;
                            descriptor.configurable = true;
                            if ("value" in descriptor) descriptor.writable = true;
                            Object.defineProperty(target, descriptor.key, descriptor);
                        }
                    }

                    return function (Constructor, protoProps, staticProps) {
                        if (protoProps) defineProperties(Constructor.prototype, protoProps);
                        if (staticProps) defineProperties(Constructor, staticProps);
                        return Constructor;
                    };
                }();

                var ClipboardAction = function () {
                    /**
                     * @param {Object} options
                     */
                    function ClipboardAction(options) {
                        _classCallCheck(this, ClipboardAction);

                        this.resolveOptions(options);
                        this.initSelection();
                    }

                    /**
                     * Defines base properties passed from constructor.
                     * @param {Object} options
                     */

                    _createClass(ClipboardAction, [{
                        key: 'resolveOptions',
                        value: function resolveOptions() {
                            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                            this.action = options.action;
                            this.container = options.container;
                            this.emitter = options.emitter;
                            this.target = options.target;
                            this.text = options.text;
                            this.trigger = options.trigger;

                            this.selectedText = '';
                        }
                    }, {
                        key: 'initSelection',
                        value: function initSelection() {
                            if (this.text) {
                                this.selectFake();
                            } else if (this.target) {
                                this.selectTarget();
                            }
                        }
                    }, {
                        key: 'selectFake',
                        value: function selectFake() {
                            var _this = this;

                            var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                            this.removeFake();

                            this.fakeHandlerCallback = function () {
                                return _this.removeFake();
                            };
                            this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

                            this.fakeElem = document.createElement('textarea');
                            // Prevent zooming on iOS
                            this.fakeElem.style.fontSize = '12pt';
                            // Reset box model
                            this.fakeElem.style.border = '0';
                            this.fakeElem.style.padding = '0';
                            this.fakeElem.style.margin = '0';
                            // Move element out of screen horizontally
                            this.fakeElem.style.position = 'absolute';
                            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                            // Move element to the same position vertically
                            var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                            this.fakeElem.style.top = yPosition + 'px';

                            this.fakeElem.setAttribute('readonly', '');
                            this.fakeElem.value = this.text;

                            this.container.appendChild(this.fakeElem);

                            this.selectedText = (0, _select2.default)(this.fakeElem);
                            this.copyText();
                        }
                    }, {
                        key: 'removeFake',
                        value: function removeFake() {
                            if (this.fakeHandler) {
                                this.container.removeEventListener('click', this.fakeHandlerCallback);
                                this.fakeHandler = null;
                                this.fakeHandlerCallback = null;
                            }

                            if (this.fakeElem) {
                                this.container.removeChild(this.fakeElem);
                                this.fakeElem = null;
                            }
                        }
                    }, {
                        key: 'selectTarget',
                        value: function selectTarget() {
                            this.selectedText = (0, _select2.default)(this.target);
                            this.copyText();
                        }
                    }, {
                        key: 'copyText',
                        value: function copyText() {
                            var succeeded = void 0;

                            try {
                                succeeded = document.execCommand(this.action);
                            } catch (err) {
                                succeeded = false;
                            }

                            this.handleResult(succeeded);
                        }
                    }, {
                        key: 'handleResult',
                        value: function handleResult(succeeded) {
                            this.emitter.emit(succeeded ? 'success' : 'error', {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            });
                        }
                    }, {
                        key: 'clearSelection',
                        value: function clearSelection() {
                            if (this.trigger) {
                                this.trigger.focus();
                            }

                            window.getSelection().removeAllRanges();
                        }
                    }, {
                        key: 'destroy',
                        value: function destroy() {
                            this.removeFake();
                        }
                    }, {
                        key: 'action',
                        set: function set() {
                            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                            this._action = action;

                            if (this._action !== 'copy' && this._action !== 'cut') {
                                throw new Error('Invalid "action" value, use either "copy" or "cut"');
                            }
                        },
                        get: function get() {
                            return this._action;
                        }
                    }, {
                        key: 'target',
                        set: function set(target) {
                            if (target !== undefined) {
                                if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                                    if (this.action === 'copy' && target.hasAttribute('disabled')) {
                                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    }

                                    if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                                        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                    }

                                    this._target = target;
                                } else {
                                    throw new Error('Invalid "target" value, use a valid Element');
                                }
                            }
                        },
                        get: function get() {
                            return this._target;
                        }
                    }]);

                    return ClipboardAction;
                }();

                module.exports = ClipboardAction;
            });
        }, { "select": 5 }], 8: [function (require, module, exports) {
            (function (global, factory) {
                if (typeof define === "function" && define.amd) {
                    define(['module', './clipboard-action', 'tiny-emitter', 'good-listener'], factory);
                } else if (typeof exports !== "undefined") {
                    factory(module, require('./clipboard-action'), require('tiny-emitter'), require('good-listener'));
                } else {
                    var mod = {
                        exports: {}
                    };
                    factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
                    global.clipboard = mod.exports;
                }
            })(this, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
                'use strict';

                var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

                var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

                var _goodListener2 = _interopRequireDefault(_goodListener);

                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule ? obj : {
                        default: obj
                    };
                }

                var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
                    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
                } : function (obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
                };

                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }

                var _createClass = function () {
                    function defineProperties(target, props) {
                        for (var i = 0; i < props.length; i++) {
                            var descriptor = props[i];
                            descriptor.enumerable = descriptor.enumerable || false;
                            descriptor.configurable = true;
                            if ("value" in descriptor) descriptor.writable = true;
                            Object.defineProperty(target, descriptor.key, descriptor);
                        }
                    }

                    return function (Constructor, protoProps, staticProps) {
                        if (protoProps) defineProperties(Constructor.prototype, protoProps);
                        if (staticProps) defineProperties(Constructor, staticProps);
                        return Constructor;
                    };
                }();

                function _possibleConstructorReturn(self, call) {
                    if (!self) {
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }

                    return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
                }

                function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
                    }

                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
                }

                var Clipboard = function (_Emitter) {
                    _inherits(Clipboard, _Emitter);

                    /**
                     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                     * @param {Object} options
                     */
                    function Clipboard(trigger, options) {
                        _classCallCheck(this, Clipboard);

                        var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

                        _this.resolveOptions(options);
                        _this.listenClick(trigger);
                        return _this;
                    }

                    /**
                     * Defines if attributes would be resolved using internal setter functions
                     * or custom functions that were passed in the constructor.
                     * @param {Object} options
                     */

                    _createClass(Clipboard, [{
                        key: 'resolveOptions',
                        value: function resolveOptions() {
                            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                            this.container = _typeof(options.container) === 'object' ? options.container : document.body;
                        }
                    }, {
                        key: 'listenClick',
                        value: function listenClick(trigger) {
                            var _this2 = this;

                            this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                                return _this2.onClick(e);
                            });
                        }
                    }, {
                        key: 'onClick',
                        value: function onClick(e) {
                            var trigger = e.delegateTarget || e.currentTarget;

                            if (this.clipboardAction) {
                                this.clipboardAction = null;
                            }

                            this.clipboardAction = new _clipboardAction2.default({
                                action: this.action(trigger),
                                target: this.target(trigger),
                                text: this.text(trigger),
                                container: this.container,
                                trigger: trigger,
                                emitter: this
                            });
                        }
                    }, {
                        key: 'defaultAction',
                        value: function defaultAction(trigger) {
                            return getAttributeValue('action', trigger);
                        }
                    }, {
                        key: 'defaultTarget',
                        value: function defaultTarget(trigger) {
                            var selector = getAttributeValue('target', trigger);

                            if (selector) {
                                return document.querySelector(selector);
                            }
                        }
                    }, {
                        key: 'defaultText',
                        value: function defaultText(trigger) {
                            return getAttributeValue('text', trigger);
                        }
                    }, {
                        key: 'destroy',
                        value: function destroy() {
                            this.listener.destroy();

                            if (this.clipboardAction) {
                                this.clipboardAction.destroy();
                                this.clipboardAction = null;
                            }
                        }
                    }], [{
                        key: 'isSupported',
                        value: function isSupported() {
                            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

                            var actions = typeof action === 'string' ? [action] : action;
                            var support = !!document.queryCommandSupported;

                            actions.forEach(function (action) {
                                support = support && !!document.queryCommandSupported(action);
                            });

                            return support;
                        }
                    }]);

                    return Clipboard;
                }(_tinyEmitter2.default);

                /**
                 * Helper function to retrieve attribute value.
                 * @param {String} suffix
                 * @param {Element} element
                 */
                function getAttributeValue(suffix, element) {
                    var attribute = 'data-clipboard-' + suffix;

                    if (!element.hasAttribute(attribute)) {
                        return;
                    }

                    return element.getAttribute(attribute);
                }

                module.exports = Clipboard;
            });
        }, { "./clipboard-action": 7, "good-listener": 4, "tiny-emitter": 6 }] }, {}, [8])(8);
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Panel = function () {
  _createClass(Panel, [{
    key: '_slideUp',
    value: function _slideUp() {
      this.el.removeClass('active');
      this.body.css('maxHeight', 0);
      this.body.css('opacity', 0);
    }
  }, {
    key: '_slideDown',
    value: function _slideDown() {
      this.el.addClass('active');
      this.body.css('maxHeight', this.height);
      this.body.css('opacity', 1);
    }
  }, {
    key: '_togglePanel',
    value: function _togglePanel() {
      if (this.initialised) {
        this.body.addClass('animatable');
      }

      if (this.active) {
        this._slideUp();
      } else {
        this._slideDown();
      }
      this.active = !this.active;
    }
  }, {
    key: '_calculateHeight',
    value: function _calculateHeight() {
      this.height = this.body.height() + 12; // giving a little bit of room (not sure why its needed but it seems to be)

      if (!this.active) {
        this.body.css('maxHeight', 0);
        this.body.css('opacity', 0);
      }

      this.active = !this.active;
      this._togglePanel();
      this.initialised = true;
    }
  }, {
    key: '_addEvents',
    value: function _addEvents() {
      var _this = this;

      this.cta.on('click', this._togglePanel);
      this.body.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
        _this.body.removeClass('animatable');
      });
    }
  }]);

  function Panel(el) {
    _classCallCheck(this, Panel);

    this.el = $(el);
    this.active = this.el.hasClass('active');
    this.initialised = false;

    this._addEvents = this._addEvents.bind(this);
    this._togglePanel = this._togglePanel.bind(this);

    this.cta = this.el.find('.panel-cta');
    this.body = this.el.find('.panel-body');

    this._calculateHeight();
    this._addEvents();
  }

  return Panel;
}();

exports.default = Panel;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tabs = function () {
  _createClass(Tabs, [{
    key: '_goToTab',
    value: function _goToTab(index) {
      this.activeIndex = index;
      for (var i = 0; i < this.tabs.length; i++) {
        if (i === this.activeIndex) {
          $(this.links[i]).addClass('active');
          $(this.tabs[i]).css('display', 'block');
        } else {
          $(this.links[i]).removeClass('active');
          $(this.tabs[i]).css('display', 'none');
        }
      }
    }
  }, {
    key: '_addEvents',
    value: function _addEvents() {
      for (var i = 0; i < this.links.length; i += 1) {
        $(this.links[i]).on('click', this._goToTab.bind(null, i));
      }
    }
  }]);

  function Tabs(el) {
    _classCallCheck(this, Tabs);

    this.el = $(el);

    this._addEvents = this._addEvents.bind(this);
    this._goToTab = this._goToTab.bind(this);

    this.activeIndex = 0;
    this.links = this.el.find('.tab-link');
    this.tabs = this.el.siblings('.demo-code');

    this._addEvents();
    this._goToTab(0);
  }

  return Tabs;
}();

exports.default = Tabs;

/***/ })
/******/ ]);
//# sourceMappingURL=demo-site.js.map