/*!
 * vue-carousel v1.0.2
 * https://fengyuanchen.github.io/vue-carousel
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-05-12T02:29:52.122Z
 */

'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
};
/**
 * Check if the given value is a non-null object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a non-null object, else `false`.
 */


function isNonNullObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof$1(value)) === 'object' && value !== null;
}

var _Object$prototype = Object.prototype,
    hasOwnProperty = _Object$prototype.hasOwnProperty,
    toString = _Object$prototype.toString;
/**
 * Check if the given value is a non-empty string.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a non-empty string, else `false`.
 */

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}
/**
 * Check if the given value is a plain object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
 */


function isPlainObject(value) {
  if (!isNonNullObject(value)) {
    return false;
  }

  try {
    var _constructor = value.constructor;
    var prototype = _constructor.prototype;
    return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (e) {
    return false;
  }
}
/**
 * Check if the given value is a function.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a function, else `false`.
 */


function isFunction(value) {
  return typeof value === 'function';
}
/**
 * Check if the given value is a non-empty array.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a non-empty array, else `false`.
 */


function isNonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}
/**
 * Check if the given value is an element.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is an element, else `false`.
 */


function isElement(value) {
  return isNonNullObject(value) && value.nodeType === 1 && toString.call(value).indexOf('Element') > -1;
}
/**
 * Check if the given value is a valid Vue component.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a valid Vue component, else `false`.
 */


function isVueComponent(value) {
  return isPlainObject(value) && (isNonEmptyString(value.template) || isFunction(value.render) || isNonEmptyString(value.el) || isElement(value.el) || isVueComponent(value.extends) || isNonEmptyArray(value.mixins) && value.mixins.some(function (val) {
    return isVueComponent(val);
  }));
}

/**
 * Convert anything to a Vue component.
 * @param {*} content - The content for creating Vue component.
 * @param {Object} options - The options for creating Vue component.
 * @param {string} options.tag - The tag for root element of the created Vue component.
 * @param {*} options.data - The data as the second parameter if the content is a render function.
 * @returns {Object} Return the created Vue component.
 */

function createVueComponent(content) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var component = {};

  if (isVueComponent(content)) {
    component = _objectSpread({}, content);
  } else if (typeof content === 'function') {
    component.render = function render(createElement) {
      return content.call(this, createElement, options.data, this);
    };
  } else {
    var tag = options.tag || 'span'; // Support HTML content with the `template` property

    component.template = "<".concat(tag, ">").concat(content, "</").concat(tag, ">");
  }

  return component;
}

var IS_BROWSER = typeof window !== 'undefined';
var IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in window.document.documentElement : false;
var HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in window : false;
var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend' : 'mouseup';
var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
var EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup' : EVENT_TOUCH_END;
var EVENT_POINTER_ENTER = HAS_POINTER_EVENT ? 'pointerenter' : 'mouseenter';
var EVENT_POINTER_LEAVE = HAS_POINTER_EVENT ? 'pointerleave' : 'mouseleave';
var script = {
  name: 'Carousel',
  props: {
    autoplay: {
      type: Boolean,
      default: true
    },
    controls: {
      type: [Boolean, String],
      default: 'hover'
    },
    data: {
      type: Array,
      default: undefined
    },
    direction: {
      type: String,
      default: 'left'
    },
    indicators: {
      type: [Boolean, String],
      default: true
    },
    indicatorTrigger: {
      type: String,
      default: 'click'
    },
    indicatorType: {
      type: String,
      default: 'line'
    },
    interval: {
      type: Number,
      default: 5000
    },
    pauseOnEnter: {
      type: Boolean,
      default: true
    },
    slideOnSwipe: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  data: function data() {
    return {
      endX: 0,
      endY: 0,
      index: 0,
      list: [],
      playing: false,
      sliding: false,
      startX: 0,
      startY: 0,
      timeout: 0
    };
  },
  watch: {
    data: function data() {
      this.init();
    }
  },
  created: function created() {
    this.init();
  },
  mounted: function mounted() {
    var _this = this;

    document.addEventListener('visibilitychange', this.onVisibilityChange = function () {
      if (_this.playing) {
        if (document.visibilityState === 'visible') {
          _this.cycle();
        } else {
          _this.pause();
        }
      }
    });

    if (this.autoplay) {
      this.play();
    }
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  },
  methods: {
    init: function init() {
      var _this2 = this;

      var data = this.data;
      var list = [];

      if (data && data.length > 0) {
        data.forEach(function (rawItem, index) {
          var active = index === _this2.index;

          var item = _objectSpread({}, rawItem && rawItem.content !== undefined ? rawItem : {
            content: rawItem
          }, {
            active: active,
            bottom: false,
            left: false,
            raw: rawItem,
            right: false,
            sliding: active,
            toBottom: false,
            toLeft: false,
            toRight: false,
            toTop: false,
            top: false
          });

          list.push(item);
        });
      }

      this.list = list;
    },
    play: function play() {
      if (!this.playing) {
        this.playing = true;
        this.cycle();
      }
    },
    cycle: function cycle() {
      var _this3 = this;

      this.pause();
      this.timeout = setTimeout(function () {
        _this3.next(function () {
          _this3.cycle();
        });
      }, this.interval);
    },
    pause: function pause() {
      clearTimeout(this.timeout);
      this.timeout = 0;
    },
    stop: function stop() {
      if (this.playing) {
        this.pause();
        this.playing = false;
      }
    },
    prev: function prev(done) {
      this.slideTo(this.index - 1, done);
    },
    next: function next(done) {
      this.slideTo(this.index + 1, done);
    },
    slide: function slide(index) {
      var _this4 = this;

      var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      if (document.hidden || this.sliding) {
        done();
        return;
      }

      this.sliding = true;
      var list = this.list;
      var minIndex = 0;
      var maxIndex = list.length - 1;

      if (index > maxIndex) {
        index = minIndex;
      } else if (index < minIndex) {
        index = maxIndex;
      }

      if (index === this.index) {
        done();
        return;
      }

      var active = list[this.index];
      var next = list[index];

      switch (this.direction) {
        case 'up':
          next.bottom = !reverse;
          next.top = reverse;
          break;

        case 'right':
          next.left = !reverse;
          next.right = reverse;
          break;

        case 'down':
          next.top = !reverse;
          next.bottom = reverse;
          break;
        // case 'left':

        default:
          next.right = !reverse;
          next.left = reverse;
      } // Waiting for the class change applied


      this.$nextTick(function () {
        // Force reflow to enable CSS3 transition
        // eslint-disable-next-line
        _this4.$el.offsetWidth;

        switch (_this4.direction) {
          case 'up':
            active.toTop = !reverse;
            active.toBottom = reverse;
            next.toTop = !reverse;
            next.toBottom = reverse;
            break;

          case 'right':
            active.toRight = !reverse;
            active.toLeft = reverse;
            next.toRight = !reverse;
            next.toLeft = reverse;
            break;

          case 'down':
            active.toBottom = !reverse;
            active.toTop = reverse;
            next.toBottom = !reverse;
            next.toTop = reverse;
            break;
          // case 'left':

          default:
            active.toLeft = !reverse;
            active.toRight = reverse;
            next.toLeft = !reverse;
            next.toRight = reverse;
        }

        active.sliding = false;
        next.sliding = true;
        setTimeout(function () {
          active.active = false;
          active.top = false;
          active.right = false;
          active.bottom = false;
          active.left = false;
          active.toTop = false;
          active.toRight = false;
          active.toBottom = false;
          active.toLeft = false;
          next.active = true;
          next.top = false;
          next.right = false;
          next.bottom = false;
          next.left = false;
          next.toTop = false;
          next.toRight = false;
          next.toBottom = false;
          next.toLeft = false;
          _this4.index = index;
          _this4.sliding = false;
          done();
        }, 600);
      });
    },
    slideTo: function slideTo(index, done) {
      if (index === this.index) {
        return;
      }

      var direction = this.direction;
      var reverse = index < this.index;

      if (direction === 'right' || direction === 'down') {
        reverse = !reverse;
      }

      this.slide(index, reverse, done);
    },
    slideStart: function slideStart(event) {
      var touch = event.touches ? event.touches[0] : null;

      if (this.pauseOnEnter) {
        this.stop();
      }

      this.startX = touch ? touch.pageX : event.pageX;
      this.startY = touch ? touch.pageY : event.pageY;
    },
    slideMove: function slideMove(event) {
      var touch = event.touches ? event.touches[0] : null;
      event.preventDefault();
      this.endX = touch ? touch.pageX : event.pageX;
      this.endY = touch ? touch.pageY : event.pageY;
    },
    slideEnd: function slideEnd() {
      var _this5 = this;

      var moveX = this.endX - this.startX;
      var moveY = this.endY - this.startY;
      this.endX = this.startX;
      this.endY = this.startY; // Ignore click events

      if (moveX === 0 && moveY === 0) {
        return;
      }

      var thresholdX = this.$el.offsetWidth / 5;
      var thresholdY = this.$el.offsetHeight / 5;
      var top = moveY < -thresholdY;
      var right = moveX > thresholdX;
      var bottom = moveY > thresholdY;
      var left = moveX < -thresholdX;

      var done = function done() {
        if (_this5.pauseOnEnter) {
          _this5.play();
        }
      };

      var prev = false;
      var next = false;

      switch (this.direction) {
        case 'up':
          prev = bottom;
          next = top;
          break;

        case 'right':
          prev = left;
          next = right;
          break;

        case 'down':
          prev = top;
          next = bottom;
          break;
        // case 'left':

        default:
          prev = right;
          next = left;
      }

      if (prev) {
        this.prev(done);
      } else if (next) {
        this.next(done);
      } else {
        done();
      }
    }
  },
  render: function render(createElement) {
    var _class,
        _ref,
        _ref2,
        _this6 = this;

    return createElement(this.tag, {
      class: (_class = {
        carousel: true
      }, _defineProperty(_class, "carousel--".concat(this.direction), this.direction), _defineProperty(_class, 'carousel--slidable', this.slideOnSwipe), _defineProperty(_class, 'carousel--controls', this.controls === 'hover'), _defineProperty(_class, 'carousel--indicators', this.indicators === 'hover'), _class),
      on: _objectSpread({}, this.$listeners, this.pauseOnEnter ? (_ref = {}, _defineProperty(_ref, EVENT_POINTER_ENTER, this.pause), _defineProperty(_ref, EVENT_POINTER_LEAVE, this.cycle), _ref) : {}, this.slideOnSwipe ? (_ref2 = {}, _defineProperty(_ref2, EVENT_POINTER_DOWN, this.slideStart), _defineProperty(_ref2, EVENT_POINTER_MOVE, this.slideMove), _defineProperty(_ref2, EVENT_POINTER_UP, this.slideEnd), _ref2) : {})
    }, this.list.length === 0 ? [] : [createElement('ul', {
      class: 'carousel__list'
    }, this.list.map(function (item, index) {
      return createElement('li', {
        attrs: {
          'data-index': index
        },
        class: {
          carousel__item: true,
          'carousel__item--active': item.active,
          'carousel__item--top': item.top,
          'carousel__item--right': item.right,
          'carousel__item--bottom': item.bottom,
          'carousel__item--left': item.left,
          'carousel__item--to-top': item.toTop,
          'carousel__item--to-right': item.toRight,
          'carousel__item--to-bottom': item.toBottom,
          'carousel__item--to-left': item.toLeft
        }
      }, [createElement(createVueComponent(item.content, {
        data: item.raw
      }))]);
    })), this.indicators ? createElement('ol', {
      class: _defineProperty({
        carousel__indicators: true
      }, "carousel__indicators--".concat(this.indicatorType), this.indicatorType)
    }, this.list.map(function (item, index) {
      return createElement('li', {
        attrs: {
          'data-slide-to': index
        },
        class: {
          carousel__indicator: true,
          'carousel__indicator--active': item.sliding
        },
        on: function () {
          var listeners = {};

          var slide = function slide() {
            _this6.slideTo(index);
          };

          if (_this6.indicatorTrigger === 'hover') {
            listeners.touchstart = slide;
            listeners[EVENT_POINTER_ENTER] = slide;
          } else {
            listeners.click = slide;
          }

          return listeners;
        }()
      });
    })) : '', this.controls ? createElement('button', {
      attrs: {
        'data-slide': 'prev'
      },
      class: 'carousel__control carousel__control--prev',
      on: {
        click: function click() {
          if (['right', 'down'].indexOf(_this6.direction) > -1) {
            _this6.next();
          } else {
            _this6.prev();
          }
        }
      }
    }) : '', this.controls ? createElement('button', {
      attrs: {
        'data-slide': 'next'
      },
      class: 'carousel__control carousel__control--next',
      on: {
        click: function click() {
          if (['right', 'down'].indexOf(_this6.direction) > -1) {
            _this6.prev();
          } else {
            _this6.next();
          }
        }
      }
    }) : '']);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}

var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;
/* template */

/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-6cdedfee_0", {
    source: ".carousel[data-v-6cdedfee]{position:relative;user-select:none}.carousel--slidable[data-v-6cdedfee]{touch-action:none}.carousel--down>.carousel__indicators[data-v-6cdedfee],.carousel--up>.carousel__indicators[data-v-6cdedfee]{bottom:auto;flex-direction:column;left:auto;right:0;top:50%;transform:translate(0,-50%)}.carousel--down>.carousel__indicators>.carousel__indicator[data-v-6cdedfee]::before,.carousel--up>.carousel__indicators>.carousel__indicator[data-v-6cdedfee]::before{height:100%;width:.125rem}.carousel--down>.carousel__indicators--disc>.carousel__indicator[data-v-6cdedfee],.carousel--up>.carousel__indicators--disc>.carousel__indicator[data-v-6cdedfee]{height:.75rem;width:1.5rem}.carousel--down>.carousel__indicators--disc>.carousel__indicator[data-v-6cdedfee]::before,.carousel--up>.carousel__indicators--disc>.carousel__indicator[data-v-6cdedfee]::before{height:.5rem;width:.5rem}.carousel--right>.carousel__indicators[data-v-6cdedfee]{flex-direction:row-reverse}.carousel--down>.carousel__indicators[data-v-6cdedfee]{flex-direction:column-reverse}.carousel--controls:hover>.carousel__control[data-v-6cdedfee]{opacity:.5;transform:translateX(0);z-index:1}.carousel--controls:hover>.carousel__control[data-v-6cdedfee]:focus,.carousel--controls:hover>.carousel__control[data-v-6cdedfee]:hover{opacity:1}.carousel--controls>.carousel__control[data-v-6cdedfee]{opacity:0;z-index:-1}.carousel--controls>.carousel__control--prev[data-v-6cdedfee]{transform:translateX(-50%)}.carousel--controls>.carousel__control--next[data-v-6cdedfee]{transform:translateX(50%)}.carousel--indicators:hover>.carousel__indicators[data-v-6cdedfee]{opacity:1;z-index:1}.carousel--indicators>.carousel__indicators[data-v-6cdedfee]{opacity:0;transition:opacity .15s;z-index:-1}.carousel__list[data-v-6cdedfee]{margin:0;overflow:hidden;padding:0;position:relative;width:100%}.carousel__item[data-v-6cdedfee]{display:none;margin:0}.carousel__item--active[data-v-6cdedfee],.carousel__item--bottom[data-v-6cdedfee],.carousel__item--left[data-v-6cdedfee],.carousel__item--right[data-v-6cdedfee],.carousel__item--top[data-v-6cdedfee]{display:block;transition:transform .6s ease-in-out;width:100%}.carousel__item--bottom[data-v-6cdedfee],.carousel__item--left[data-v-6cdedfee],.carousel__item--right[data-v-6cdedfee],.carousel__item--top[data-v-6cdedfee]{left:0;position:absolute;top:0}.carousel__item--top[data-v-6cdedfee]{transform:translateY(-100%)}.carousel__item--top.carousel__item--to-bottom[data-v-6cdedfee]{transform:translateY(0)}.carousel__item--right[data-v-6cdedfee]{transform:translateX(100%)}.carousel__item--right.carousel__item--to-left[data-v-6cdedfee]{transform:translateX(0)}.carousel__item--bottom[data-v-6cdedfee]{transform:translateY(100%)}.carousel__item--bottom.carousel__item--to-top[data-v-6cdedfee]{transform:translateY(0)}.carousel__item--left[data-v-6cdedfee]{transform:translateX(-100%)}.carousel__item--left.carousel__item--to-right[data-v-6cdedfee]{transform:translateX(0)}.carousel__item--active[data-v-6cdedfee]{transform:translate(0,0);z-index:1}.carousel__item--active.carousel__item--to-top[data-v-6cdedfee]{transform:translateY(-100%)}.carousel__item--active.carousel__item--to-right[data-v-6cdedfee]{transform:translateX(100%)}.carousel__item--active.carousel__item--to-bottom[data-v-6cdedfee]{transform:translateY(100%)}.carousel__item--active.carousel__item--to-left[data-v-6cdedfee]{transform:translateX(-100%)}.carousel__indicators[data-v-6cdedfee]{bottom:0;display:flex;justify-content:center;left:50%;list-style:none;margin:0;padding:0;position:absolute;transform:translateX(-50%);z-index:1}.carousel__indicators--disc>.carousel__indicator[data-v-6cdedfee]{width:.75rem}.carousel__indicators--disc>.carousel__indicator[data-v-6cdedfee]::before{border-radius:50%;height:.5rem;width:.5rem}.carousel__indicator[data-v-6cdedfee]{cursor:pointer;height:1.5rem;margin:.125rem;opacity:.5;position:relative;transition:opacity .15s;width:1.5rem}.carousel__indicator[data-v-6cdedfee]::before{background-color:#fff;content:\"\";display:block;height:.125rem;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:100%}.carousel__indicator--active[data-v-6cdedfee]{opacity:1}.carousel__control[data-v-6cdedfee]{background-color:rgba(0,0,0,.5);border:0;border-radius:50%;color:#fff;cursor:pointer;height:2rem;margin-top:-1rem;opacity:.5;padding:.5rem;position:absolute;top:50%;transition:all .15s;width:2rem}.carousel__control[data-v-6cdedfee]:focus,.carousel__control[data-v-6cdedfee]:hover{opacity:1}.carousel__control[data-v-6cdedfee]:focus{outline:0}.carousel__control[data-v-6cdedfee]::before{border:.0625rem solid transparent;border-radius:.125rem;content:\"\";display:block;height:.5rem;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%) rotate(45deg);width:.5rem}.carousel__control--prev[data-v-6cdedfee]{left:1rem}.carousel__control--prev[data-v-6cdedfee]::before{border-bottom-color:#fff;border-left-color:#fff;margin-left:.125rem}.carousel__control--next[data-v-6cdedfee]{right:1rem}.carousel__control--next[data-v-6cdedfee]::before{border-right-color:#fff;border-top-color:#fff;margin-left:-.125rem}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-6cdedfee";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = undefined;
/* style inject SSR */

var Carousel = normalizeComponent_1({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, browser, undefined);

Carousel.install = function (Vue) {
  Vue.component(Carousel.name, Carousel);
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Carousel);
}

module.exports = Carousel;
