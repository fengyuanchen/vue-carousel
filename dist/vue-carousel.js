/*!
 * vue-carousel v0.1.0
 * https://fengyuanchen.github.io/vue-carousel
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-06-28T14:30:31.714Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueCarousel = factory());
}(this, (function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var defineProperty = function (obj, key, value) {
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
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
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
      component = _extends({}, content);
    } else if (typeof content === 'function') {
      component.render = function render(createElement) {
        return content.call(this, createElement, options.data, this);
      };
    } else {
      var tag = options.tag || 'span';

      // Support HTML content with the `template` property
      component.template = '<' + tag + '>' + content + '</' + tag + '>';
    }

    return component;
  }

  var script = {
    name: 'carousel',

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


    props: {
      autoplay: {
        type: Boolean,
        default: true
      },

      controls: {
        type: [Boolean, String],
        default: 'hover'
      },

      data: Array,

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

      tag: {
        type: String,
        default: 'div'
      }
    },

    render: function render(createElement) {
      var _class,
          _this = this;

      return createElement(this.tag, {
        class: (_class = {
          carousel: true
        }, defineProperty(_class, 'carousel--' + this.direction, this.direction), defineProperty(_class, 'carousel--controls', this.controls === 'hover'), defineProperty(_class, 'carousel--indicators', this.indicators === 'hover'), _class),

        on: _extends({}, this.$listeners, window.PointerEvent ? {
          pointerenter: this.pause,
          pointerleave: this.cycle,
          pointerdown: this.slideStart,
          pointermove: this.slideMove,
          pointerup: this.slideEnd
        } : {
          mouseenter: this.pause,
          mouseleave: this.cycle,
          touchstart: this.slideStart,
          touchmove: this.slideMove,
          touchend: this.slideEnd,
          mousedown: this.slideStart,
          mousemove: this.slideMove,
          mouseup: this.slideEnd
        })
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
        class: defineProperty({
          carousel__indicators: true
        }, 'carousel__indicators--' + this.indicatorType, this.indicatorType)
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
              _this.slideTo(index);
            };

            if (_this.indicatorTrigger === 'hover') {
              listeners.touchstart = slide;
              listeners[window.PointerEvent ? 'pointerenter' : 'mouseenter'] = slide;
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
            if (['right', 'down'].indexOf(_this.direction) > -1) {
              _this.next();
            } else {
              _this.prev();
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
            if (['right', 'down'].indexOf(_this.direction) > -1) {
              _this.prev();
            } else {
              _this.next();
            }
          }
        }
      }) : '']);
    },


    methods: {
      init: function init() {
        var _this2 = this;

        var data = this.data;

        var list = [];

        if (data && data.length > 0) {
          data.forEach(function (rawItem, index) {
            var active = index === _this2.index;
            var item = _extends({}, rawItem && rawItem.content !== undefined ? rawItem : {
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
        }

        // Waiting for the class change applied
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

        if (event.touches) {
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
      slideEnd: function slideEnd(event) {
        var _this5 = this;

        var moveX = this.endX - this.startX;
        var moveY = this.endY - this.startY;
        var thresholdX = this.$el.offsetWidth / 5;
        var thresholdY = this.$el.offsetHeight / 5;
        var top = moveY < -thresholdY;
        var right = moveX > thresholdX;
        var bottom = moveY > thresholdY;
        var left = moveX < -thresholdX;
        var done = function done() {
          if (event.touches) {
            _this5.start();
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

        this.endX = this.startX;
        this.endY = this.startY;
      }
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
      var _this6 = this;

      document.addEventListener('visibilitychange', this.onVisibilityChange = function () {
        if (_this6.playing) {
          if (document.visibilityState === 'visible') {
            _this6.cycle();
          } else {
            _this6.pause();
          }
        }
      });

      if (this.autoplay) {
        this.play();
      }
    },
    beforeDestroy: function beforeDestroy() {
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }
  };

  /* script */
  var __vue_script__ = script;

  /* template */

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) return;
    inject("data-v-265110c8_0", { source: "\n.carousel[data-v-265110c8] {\n  position: relative;\n  touch-action: none;\n  user-select: none;\n}\n.carousel--up > .carousel__indicators[data-v-265110c8], .carousel--down > .carousel__indicators[data-v-265110c8] {\n    bottom: auto;\n    flex-direction: column;\n    left: auto;\n    right: 0;\n    top: 50%;\n    transform: translate(0, -50%);\n}\n.carousel--up > .carousel__indicators > .carousel__indicator[data-v-265110c8]::before, .carousel--down > .carousel__indicators > .carousel__indicator[data-v-265110c8]::before {\n      height: 100%;\n      width: .125rem;\n}\n.carousel--up > .carousel__indicators--disc > .carousel__indicator[data-v-265110c8], .carousel--down > .carousel__indicators--disc > .carousel__indicator[data-v-265110c8] {\n    height: .75rem;\n    width: 1.5rem;\n}\n.carousel--up > .carousel__indicators--disc > .carousel__indicator[data-v-265110c8]::before, .carousel--down > .carousel__indicators--disc > .carousel__indicator[data-v-265110c8]::before {\n      height: .5rem;\n      width: .5rem;\n}\n.carousel--right > .carousel__indicators[data-v-265110c8] {\n    flex-direction: row-reverse;\n}\n.carousel--down > .carousel__indicators[data-v-265110c8] {\n    flex-direction: column-reverse;\n}\n.carousel--controls:hover > .carousel__control[data-v-265110c8] {\n    opacity: .5;\n    z-index: 1;\n    transform: translateX(0);\n}\n.carousel--controls:hover > .carousel__control[data-v-265110c8]:focus, .carousel--controls:hover > .carousel__control[data-v-265110c8]:hover {\n      opacity: 1;\n}\n.carousel--controls > .carousel__control[data-v-265110c8] {\n    opacity: 0;\n    z-index: -1;\n}\n.carousel--controls > .carousel__control--prev[data-v-265110c8] {\n    transform: translateX(-50%);\n}\n.carousel--controls > .carousel__control--next[data-v-265110c8] {\n    transform: translateX(50%);\n}\n.carousel--indicators:hover > .carousel__indicators[data-v-265110c8] {\n    opacity: 1;\n    z-index: 1;\n}\n.carousel--indicators > .carousel__indicators[data-v-265110c8] {\n    opacity: 0;\n    transition: opacity .15s;\n    z-index: -1;\n}\n.carousel__list[data-v-265110c8] {\n    margin: 0;\n    overflow: hidden;\n    padding: 0;\n    position: relative;\n    width: 100%;\n}\n.carousel__item[data-v-265110c8] {\n    display: none;\n    margin: 0;\n}\n.carousel__item--active[data-v-265110c8], .carousel__item--top[data-v-265110c8], .carousel__item--right[data-v-265110c8], .carousel__item--bottom[data-v-265110c8], .carousel__item--left[data-v-265110c8] {\n      display: block;\n      transition: transform .6s ease-in-out;\n      width: 100%;\n}\n.carousel__item--top[data-v-265110c8], .carousel__item--right[data-v-265110c8], .carousel__item--bottom[data-v-265110c8], .carousel__item--left[data-v-265110c8] {\n      left: 0;\n      position: absolute;\n      top: 0;\n}\n.carousel__item--top[data-v-265110c8] {\n      transform: translateY(-100%);\n}\n.carousel__item--top.carousel__item--to-bottom[data-v-265110c8] {\n        transform: translateY(0);\n}\n.carousel__item--right[data-v-265110c8] {\n      transform: translateX(100%);\n}\n.carousel__item--right.carousel__item--to-left[data-v-265110c8] {\n        transform: translateX(0);\n}\n.carousel__item--bottom[data-v-265110c8] {\n      transform: translateY(100%);\n}\n.carousel__item--bottom.carousel__item--to-top[data-v-265110c8] {\n        transform: translateY(0);\n}\n.carousel__item--left[data-v-265110c8] {\n      transform: translateX(-100%);\n}\n.carousel__item--left.carousel__item--to-right[data-v-265110c8] {\n        transform: translateX(0);\n}\n.carousel__item--active[data-v-265110c8] {\n      transform: translate(0, 0);\n      z-index: 1;\n}\n.carousel__item--active.carousel__item--to-top[data-v-265110c8] {\n        transform: translateY(-100%);\n}\n.carousel__item--active.carousel__item--to-right[data-v-265110c8] {\n        transform: translateX(100%);\n}\n.carousel__item--active.carousel__item--to-bottom[data-v-265110c8] {\n        transform: translateY(100%);\n}\n.carousel__item--active.carousel__item--to-left[data-v-265110c8] {\n        transform: translateX(-100%);\n}\n.carousel__indicators[data-v-265110c8] {\n    bottom: 0;\n    display: flex;\n    justify-content: center;\n    left: 50%;\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    position: absolute;\n    transform: translateX(-50%);\n    z-index: 1;\n}\n.carousel__indicators--disc > .carousel__indicator[data-v-265110c8] {\n      width: .75rem;\n}\n.carousel__indicators--disc > .carousel__indicator[data-v-265110c8]::before {\n        border-radius: 50%;\n        height: .5rem;\n        width: .5rem;\n}\n.carousel__indicator[data-v-265110c8] {\n    cursor: pointer;\n    height: 1.5rem;\n    margin: .125rem;\n    opacity: .5;\n    position: relative;\n    transition: opacity .15s;\n    width: 1.5rem;\n}\n.carousel__indicator[data-v-265110c8]::before {\n      background-color: #fff;\n      content: \"\";\n      display: block;\n      height: .125rem;\n      left: 50%;\n      position: absolute;\n      top: 50%;\n      transform: translate(-50%, -50%);\n      width: 100%;\n}\n.carousel__indicator--active[data-v-265110c8] {\n      opacity: 1;\n}\n.carousel__control[data-v-265110c8] {\n    background-color: rgba(0, 0, 0, 0.5);\n    border: 0;\n    border-radius: 50%;\n    color: #fff;\n    cursor: pointer;\n    height: 2rem;\n    margin-top: -1rem;\n    opacity: .5;\n    padding: .5rem;\n    position: absolute;\n    top: 50%;\n    transition: all .15s;\n    width: 2rem;\n}\n.carousel__control[data-v-265110c8]:focus, .carousel__control[data-v-265110c8]:hover {\n      opacity: 1;\n}\n.carousel__control[data-v-265110c8]:focus {\n      outline: none;\n}\n.carousel__control[data-v-265110c8]::before {\n      border: .0625rem solid transparent;\n      border-radius: .125rem;\n      content: \"\";\n      display: block;\n      height: .5rem;\n      left: 50%;\n      position: absolute;\n      top: 50%;\n      transform: translate(-50%, -50%) rotate(45deg);\n      width: .5rem;\n}\n.carousel__control--prev[data-v-265110c8] {\n      left: 1rem;\n}\n.carousel__control--prev[data-v-265110c8]::before {\n        border-bottom-color: #fff;\n        border-left-color: #fff;\n        margin-left: .125rem;\n}\n.carousel__control--next[data-v-265110c8] {\n      right: 1rem;\n}\n.carousel__control--next[data-v-265110c8]::before {\n        border-right-color: #fff;\n        border-top-color: #fff;\n        margin-left: -.125rem;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: { "version": 3, "sources": ['C:\\Users\\Felix\\Projects\\Phoenix\\vue-carousel/C:\\Users\\Felix\\Projects\\Phoenix\\vue-carousel/C:\\Users\\Felix\\Projects\\Phoenix\\vue-carousel\\src\\index.vue', "index.vue"], "names": [], "mappings": ";AAkhBA;EACA,mBAAA;EACA,mBAAA;EACA,kBAAA;CAyRA;AAvRA;IAGA,aAAA;IACA,uBAAA;IACA,WAAA;IACA,SAAA;IACA,SAAA;IACA,8BAAA;CAQA;AAhBA;MAYA,aAAA;MACA,eAAA;CACA;AAdA;IAoBA,eAAA;IACA,cAAA;CAMA;AA3BA;MAwBA,cAAA;MACA,aAAA;CACA;AAKA;IAEA,4BAAA;CACA;AAGA;IAEA,+BAAA;CACA;AAGA;IAGA,YAAA;IACA,WAAA;IACA,yBAAA;CAMA;AAXA;MASA,WAAA;CACA;AAVA;IAeA,WAAA;IACA,YAAA;CACA;AAjBA;IAoBA,4BAAA;CACA;AArBA;IAwBA,2BAAA;CACA;AAGA;IAGA,WAAA;IACA,WAAA;CACA;AALA;IASA,WAAA;IACA,yBAAA;IACA,YAAA;CACA;AAGA;IACA,UAAA;IACA,iBAAA;IACA,WAAA;IACA,mBAAA;IACA,YAAA;CACA;AAEA;IACA,cAAA;IACA,UAAA;CAyEA;AAvEA;MAKA,eAAA;MACA,sCAAA;MACA,YAAA;CACA;AAEA;MAIA,QAAA;MACA,mBAAA;MACA,OAAA;CACA;AAEA;MACA,6BAAA;CAKA;AANA;QAIA,yBAAA;CACA;AAGA;MACA,4BAAA;CAKA;AANA;QAIA,yBAAA;CACA;AAGA;MACA,4BAAA;CAKA;AANA;QAIA,yBAAA;CACA;AAGA;MACA,6BAAA;CAKA;AANA;QAIA,yBAAA;CACA;AAGA;MACA,2BAAA;MACA,WAAA;CAiBA;AAnBA;QAKA,6BAAA;CACA;AANA;QASA,4BAAA;CACA;AAVA;QAaA,4BAAA;CACA;AAdA;QAiBA,6BAAA;CACA;AAIA;IACA,UAAA;IACA,cAAA;IACA,wBAAA;IACA,UAAA;IACA,iBAAA;IACA,UAAA;IACA,WAAA;IACA,mBAAA;IACA,4BAAA;IACA,WAAA;CAaA;AAXA;MAEA,cAAA;CAOA;AATA;QAKA,mBAAA;QACA,cAAA;QACA,aAAA;CACA;AAKA;IACA,gBAAA;IACA,eAAA;IACA,gBAAA;IACA,YAAA;IACA,mBAAA;IACA,yBAAA;IACA,cAAA;CAiBA;AAxBA;MAUA,uBAAA;MACA,YAAA;MACA,eAAA;MACA,gBAAA;MACA,UAAA;MACA,mBAAA;MACA,SAAA;MACA,iCAAA;MACA,YAAA;CACA;AAEA;MACA,WAAA;CACA;AAGA;IACA,qCAAA;IACA,UAAA;IACA,mBAAA;IACA,YAAA;IACA,gBAAA;IACA,aAAA;IACA,kBAAA;IACA,YAAA;IACA,eAAA;IACA,mBAAA;IACA,SAAA;IACA,qBAAA;IACA,YAAA;CA2CA;AAxDA;MAiBA,WAAA;CACA;AAlBA;MAqBA,cAAA;CACA;AAtBA;MAyBA,mCAAA;MACA,uBAAA;MACA,YAAA;MACA,eAAA;MACA,cAAA;MACA,UAAA;MACA,mBAAA;MACA,SAAA;MACA,+CAAA;MACA,aAAA;CACA;AAEA;MACA,WAAA;CAOA;AARA;QAIA,0BAAA;QACA,wBAAA;QACA,qBAAA;CACA;AAGA;MACA,YAAA;CAOA;AARA;QAIA,yBAAA;QACA,uBAAA;QACA,sBAAA;CACA;;ACpoBA,qCAAqC", "file": "index.vue", "sourcesContent": [null, ".carousel {\n  position: relative;\n  touch-action: none;\n  user-select: none; }\n  .carousel--up > .carousel__indicators, .carousel--down > .carousel__indicators {\n    bottom: auto;\n    flex-direction: column;\n    left: auto;\n    right: 0;\n    top: 50%;\n    transform: translate(0, -50%); }\n    .carousel--up > .carousel__indicators > .carousel__indicator::before, .carousel--down > .carousel__indicators > .carousel__indicator::before {\n      height: 100%;\n      width: .125rem; }\n  .carousel--up > .carousel__indicators--disc > .carousel__indicator, .carousel--down > .carousel__indicators--disc > .carousel__indicator {\n    height: .75rem;\n    width: 1.5rem; }\n    .carousel--up > .carousel__indicators--disc > .carousel__indicator::before, .carousel--down > .carousel__indicators--disc > .carousel__indicator::before {\n      height: .5rem;\n      width: .5rem; }\n  .carousel--right > .carousel__indicators {\n    flex-direction: row-reverse; }\n  .carousel--down > .carousel__indicators {\n    flex-direction: column-reverse; }\n  .carousel--controls:hover > .carousel__control {\n    opacity: .5;\n    z-index: 1;\n    transform: translateX(0); }\n    .carousel--controls:hover > .carousel__control:focus, .carousel--controls:hover > .carousel__control:hover {\n      opacity: 1; }\n  .carousel--controls > .carousel__control {\n    opacity: 0;\n    z-index: -1; }\n  .carousel--controls > .carousel__control--prev {\n    transform: translateX(-50%); }\n  .carousel--controls > .carousel__control--next {\n    transform: translateX(50%); }\n  .carousel--indicators:hover > .carousel__indicators {\n    opacity: 1;\n    z-index: 1; }\n  .carousel--indicators > .carousel__indicators {\n    opacity: 0;\n    transition: opacity .15s;\n    z-index: -1; }\n  .carousel__list {\n    margin: 0;\n    overflow: hidden;\n    padding: 0;\n    position: relative;\n    width: 100%; }\n  .carousel__item {\n    display: none;\n    margin: 0; }\n    .carousel__item--active, .carousel__item--top, .carousel__item--right, .carousel__item--bottom, .carousel__item--left {\n      display: block;\n      transition: transform .6s ease-in-out;\n      width: 100%; }\n    .carousel__item--top, .carousel__item--right, .carousel__item--bottom, .carousel__item--left {\n      left: 0;\n      position: absolute;\n      top: 0; }\n    .carousel__item--top {\n      transform: translateY(-100%); }\n      .carousel__item--top.carousel__item--to-bottom {\n        transform: translateY(0); }\n    .carousel__item--right {\n      transform: translateX(100%); }\n      .carousel__item--right.carousel__item--to-left {\n        transform: translateX(0); }\n    .carousel__item--bottom {\n      transform: translateY(100%); }\n      .carousel__item--bottom.carousel__item--to-top {\n        transform: translateY(0); }\n    .carousel__item--left {\n      transform: translateX(-100%); }\n      .carousel__item--left.carousel__item--to-right {\n        transform: translateX(0); }\n    .carousel__item--active {\n      transform: translate(0, 0);\n      z-index: 1; }\n      .carousel__item--active.carousel__item--to-top {\n        transform: translateY(-100%); }\n      .carousel__item--active.carousel__item--to-right {\n        transform: translateX(100%); }\n      .carousel__item--active.carousel__item--to-bottom {\n        transform: translateY(100%); }\n      .carousel__item--active.carousel__item--to-left {\n        transform: translateX(-100%); }\n  .carousel__indicators {\n    bottom: 0;\n    display: flex;\n    justify-content: center;\n    left: 50%;\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    position: absolute;\n    transform: translateX(-50%);\n    z-index: 1; }\n    .carousel__indicators--disc > .carousel__indicator {\n      width: .75rem; }\n      .carousel__indicators--disc > .carousel__indicator::before {\n        border-radius: 50%;\n        height: .5rem;\n        width: .5rem; }\n  .carousel__indicator {\n    cursor: pointer;\n    height: 1.5rem;\n    margin: .125rem;\n    opacity: .5;\n    position: relative;\n    transition: opacity .15s;\n    width: 1.5rem; }\n    .carousel__indicator::before {\n      background-color: #fff;\n      content: \"\";\n      display: block;\n      height: .125rem;\n      left: 50%;\n      position: absolute;\n      top: 50%;\n      transform: translate(-50%, -50%);\n      width: 100%; }\n    .carousel__indicator--active {\n      opacity: 1; }\n  .carousel__control {\n    background-color: rgba(0, 0, 0, 0.5);\n    border: 0;\n    border-radius: 50%;\n    color: #fff;\n    cursor: pointer;\n    height: 2rem;\n    margin-top: -1rem;\n    opacity: .5;\n    padding: .5rem;\n    position: absolute;\n    top: 50%;\n    transition: all .15s;\n    width: 2rem; }\n    .carousel__control:focus, .carousel__control:hover {\n      opacity: 1; }\n    .carousel__control:focus {\n      outline: none; }\n    .carousel__control::before {\n      border: .0625rem solid transparent;\n      border-radius: .125rem;\n      content: \"\";\n      display: block;\n      height: .5rem;\n      left: 50%;\n      position: absolute;\n      top: 50%;\n      transform: translate(-50%, -50%) rotate(45deg);\n      width: .5rem; }\n    .carousel__control--prev {\n      left: 1rem; }\n      .carousel__control--prev::before {\n        border-bottom-color: #fff;\n        border-left-color: #fff;\n        margin-left: .125rem; }\n    .carousel__control--next {\n      right: 1rem; }\n      .carousel__control--next::before {\n        border-right-color: #fff;\n        border-top-color: #fff;\n        margin-left: -.125rem; }\n\n/*# sourceMappingURL=index.vue.map */"] }, media: undefined });
  };
  /* scoped */
  var __vue_scope_id__ = "data-v-265110c8";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = undefined;
  /* component normalizer */
  function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    {
      component.__file = 'C:\\Users\\Felix\\Projects\\Phoenix\\vue-carousel\\src\\index.vue';
    }

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      var hook = void 0;
      if (style) {
        hook = function hook(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component;
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    };
  }
  /* style inject SSR */

  var index = __vue_normalize__({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

  return index;

})));
