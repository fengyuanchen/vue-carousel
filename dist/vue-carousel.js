/*!
 * vue-carousel v0.1.1
 * https://fengyuanchen.github.io/vue-carousel
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-08-05T06:48:22.320Z
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
  var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-265110c8_0", { source: "\n.carousel[data-v-265110c8]{position:relative;touch-action:none;user-select:none\n}\n.carousel--down>.carousel__indicators[data-v-265110c8],.carousel--up>.carousel__indicators[data-v-265110c8]{bottom:auto;flex-direction:column;left:auto;right:0;top:50%;transform:translate(0,-50%)\n}\n.carousel--down>.carousel__indicators>.carousel__indicator[data-v-265110c8]::before,.carousel--up>.carousel__indicators>.carousel__indicator[data-v-265110c8]::before{height:100%;width:.125rem\n}\n.carousel--down>.carousel__indicators--disc>.carousel__indicator[data-v-265110c8],.carousel--up>.carousel__indicators--disc>.carousel__indicator[data-v-265110c8]{height:.75rem;width:1.5rem\n}\n.carousel--down>.carousel__indicators--disc>.carousel__indicator[data-v-265110c8]::before,.carousel--up>.carousel__indicators--disc>.carousel__indicator[data-v-265110c8]::before{height:.5rem;width:.5rem\n}\n.carousel--right>.carousel__indicators[data-v-265110c8]{flex-direction:row-reverse\n}\n.carousel--down>.carousel__indicators[data-v-265110c8]{flex-direction:column-reverse\n}\n.carousel--controls:hover>.carousel__control[data-v-265110c8]{opacity:.5;z-index:1;transform:translateX(0)\n}\n.carousel--controls:hover>.carousel__control[data-v-265110c8]:focus,.carousel--controls:hover>.carousel__control[data-v-265110c8]:hover{opacity:1\n}\n.carousel--controls>.carousel__control[data-v-265110c8]{opacity:0;z-index:-1\n}\n.carousel--controls>.carousel__control--prev[data-v-265110c8]{transform:translateX(-50%)\n}\n.carousel--controls>.carousel__control--next[data-v-265110c8]{transform:translateX(50%)\n}\n.carousel--indicators:hover>.carousel__indicators[data-v-265110c8]{opacity:1;z-index:1\n}\n.carousel--indicators>.carousel__indicators[data-v-265110c8]{opacity:0;transition:opacity .15s;z-index:-1\n}\n.carousel__list[data-v-265110c8]{margin:0;overflow:hidden;padding:0;position:relative;width:100%\n}\n.carousel__item[data-v-265110c8]{display:none;margin:0\n}\n.carousel__item--active[data-v-265110c8],.carousel__item--bottom[data-v-265110c8],.carousel__item--left[data-v-265110c8],.carousel__item--right[data-v-265110c8],.carousel__item--top[data-v-265110c8]{display:block;transition:transform .6s ease-in-out;width:100%\n}\n.carousel__item--bottom[data-v-265110c8],.carousel__item--left[data-v-265110c8],.carousel__item--right[data-v-265110c8],.carousel__item--top[data-v-265110c8]{left:0;position:absolute;top:0\n}\n.carousel__item--top[data-v-265110c8]{transform:translateY(-100%)\n}\n.carousel__item--top.carousel__item--to-bottom[data-v-265110c8]{transform:translateY(0)\n}\n.carousel__item--right[data-v-265110c8]{transform:translateX(100%)\n}\n.carousel__item--right.carousel__item--to-left[data-v-265110c8]{transform:translateX(0)\n}\n.carousel__item--bottom[data-v-265110c8]{transform:translateY(100%)\n}\n.carousel__item--bottom.carousel__item--to-top[data-v-265110c8]{transform:translateY(0)\n}\n.carousel__item--left[data-v-265110c8]{transform:translateX(-100%)\n}\n.carousel__item--left.carousel__item--to-right[data-v-265110c8]{transform:translateX(0)\n}\n.carousel__item--active[data-v-265110c8]{transform:translate(0,0);z-index:1\n}\n.carousel__item--active.carousel__item--to-top[data-v-265110c8]{transform:translateY(-100%)\n}\n.carousel__item--active.carousel__item--to-right[data-v-265110c8]{transform:translateX(100%)\n}\n.carousel__item--active.carousel__item--to-bottom[data-v-265110c8]{transform:translateY(100%)\n}\n.carousel__item--active.carousel__item--to-left[data-v-265110c8]{transform:translateX(-100%)\n}\n.carousel__indicators[data-v-265110c8]{bottom:0;display:flex;justify-content:center;left:50%;list-style:none;margin:0;padding:0;position:absolute;transform:translateX(-50%);z-index:1\n}\n.carousel__indicators--disc>.carousel__indicator[data-v-265110c8]{width:.75rem\n}\n.carousel__indicators--disc>.carousel__indicator[data-v-265110c8]::before{border-radius:50%;height:.5rem;width:.5rem\n}\n.carousel__indicator[data-v-265110c8]{cursor:pointer;height:1.5rem;margin:.125rem;opacity:.5;position:relative;transition:opacity .15s;width:1.5rem\n}\n.carousel__indicator[data-v-265110c8]::before{background-color:#fff;content:\"\";display:block;height:.125rem;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:100%\n}\n.carousel__indicator--active[data-v-265110c8]{opacity:1\n}\n.carousel__control[data-v-265110c8]{background-color:rgba(0,0,0,.5);border:0;border-radius:50%;color:#fff;cursor:pointer;height:2rem;margin-top:-1rem;opacity:.5;padding:.5rem;position:absolute;top:50%;transition:all .15s;width:2rem\n}\n.carousel__control[data-v-265110c8]:focus,.carousel__control[data-v-265110c8]:hover{opacity:1\n}\n.carousel__control[data-v-265110c8]:focus{outline:0\n}\n.carousel__control[data-v-265110c8]::before{border:.0625rem solid transparent;border-radius:.125rem;content:\"\";display:block;height:.5rem;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%) rotate(45deg);width:.5rem\n}\n.carousel__control--prev[data-v-265110c8]{left:1rem\n}\n.carousel__control--prev[data-v-265110c8]::before{border-bottom-color:#fff;border-left-color:#fff;margin-left:.125rem\n}\n.carousel__control--next[data-v-265110c8]{right:1rem\n}\n.carousel__control--next[data-v-265110c8]::before{border-right-color:#fff;border-top-color:#fff;margin-left:-.125rem\n}", map: undefined, media: undefined });
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

    // For security concerns, we use only base name in production mode.
    component.__file = "index.vue";

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

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
        }

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
