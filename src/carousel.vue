<script>
import createVueComponent from '@chenfengyuan/create-vue-component';

const IS_BROWSER = typeof window !== 'undefined';
const IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in window.document.documentElement : false;
const HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in window : false;
const EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
const EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
const EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend' : 'mouseup';
const EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
const EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
const EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup' : EVENT_TOUCH_END;
const EVENT_POINTER_ENTER = HAS_POINTER_EVENT ? 'pointerenter' : 'mouseenter';
const EVENT_POINTER_LEAVE = HAS_POINTER_EVENT ? 'pointerleave' : 'mouseleave';

export default {
  name: 'Carousel',

  props: {
    autoplay: {
      type: Boolean,
      default: true,
    },

    controls: {
      type: [Boolean, String],
      default: 'hover',
    },

    data: {
      type: Array,
      default: undefined,
    },

    direction: {
      type: String,
      default: 'left',
    },

    indicators: {
      type: [Boolean, String],
      default: true,
    },

    indicatorTrigger: {
      type: String,
      default: 'click',
    },

    indicatorType: {
      type: String,
      default: 'line',
    },

    interval: {
      type: Number,
      default: 5000,
    },

    pauseOnEnter: {
      type: Boolean,
      default: true,
    },

    slideOnSwipe: {
      type: Boolean,
      default: true,
    },

    tag: {
      type: String,
      default: 'div',
    },
  },

  data() {
    return {
      endX: 0,
      endY: 0,
      index: 0,
      list: [],
      playing: false,
      sliding: false,
      startX: 0,
      startY: 0,
      timeout: 0,
    };
  },

  watch: {
    data() {
      this.init();
    },
  },

  created() {
    this.init();
  },

  mounted() {
    document.addEventListener('visibilitychange', this.onVisibilityChange = () => {
      if (this.playing) {
        if (document.visibilityState === 'visible') {
          this.cycle();
        } else {
          this.pause();
        }
      }
    });

    if (this.autoplay) {
      this.play();
    }
  },

  beforeDestroy() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  },

  methods: {
    init() {
      const { data } = this;
      const list = [];

      if (data && data.length > 0) {
        data.forEach((rawItem, index) => {
          const active = index === this.index;
          const item = {
            ...(rawItem && rawItem.content !== undefined ? rawItem : {
              content: rawItem,
            }),

            active,
            bottom: false,
            left: false,
            raw: rawItem,
            right: false,
            sliding: active,
            toBottom: false,
            toLeft: false,
            toRight: false,
            toTop: false,
            top: false,
          };

          list.push(item);
        });
      }

      this.list = list;
    },

    play() {
      if (!this.playing) {
        this.playing = true;
        this.cycle();
      }
    },

    cycle() {
      this.pause();
      this.timeout = setTimeout(() => {
        this.next(() => {
          this.cycle();
        });
      }, this.interval);
    },

    pause() {
      clearTimeout(this.timeout);
      this.timeout = 0;
    },

    stop() {
      if (this.playing) {
        this.pause();
        this.playing = false;
      }
    },

    prev(done) {
      this.slideTo(this.index - 1, done);
    },

    next(done) {
      this.slideTo(this.index + 1, done);
    },

    slide(index, reverse = false, done = () => {}) {
      if (document.hidden || this.sliding) {
        done();
        return;
      }

      this.sliding = true;

      const { list } = this;
      const minIndex = 0;
      const maxIndex = list.length - 1;

      if (index > maxIndex) {
        index = minIndex;
      } else if (index < minIndex) {
        index = maxIndex;
      }

      if (index === this.index) {
        done();
        return;
      }

      const active = list[this.index];
      const next = list[index];

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
      this.$nextTick(() => {
        // Force reflow to enable CSS3 transition
        // eslint-disable-next-line
        this.$el.offsetWidth;

        switch (this.direction) {
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

        setTimeout(() => {
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

          this.index = index;
          this.sliding = false;
          done();
        }, 600);
      });
    },

    slideTo(index, done) {
      if (index === this.index) {
        return;
      }

      const { direction } = this;
      let reverse = index < this.index;

      if (direction === 'right' || direction === 'down') {
        reverse = !reverse;
      }

      this.slide(index, reverse, done);
    },

    slideStart(event) {
      const touch = event.touches ? event.touches[0] : null;

      if (this.pauseOnEnter) {
        this.stop();
      }

      this.startX = touch ? touch.pageX : event.pageX;
      this.startY = touch ? touch.pageY : event.pageY;
    },

    slideMove(event) {
      const touch = event.touches ? event.touches[0] : null;

      event.preventDefault();

      this.endX = touch ? touch.pageX : event.pageX;
      this.endY = touch ? touch.pageY : event.pageY;
    },

    slideEnd() {
      const moveX = this.endX - this.startX;
      const moveY = this.endY - this.startY;

      this.endX = this.startX;
      this.endY = this.startY;

      // Ignore click events
      if (moveX === 0 && moveY === 0) {
        return;
      }

      const thresholdX = this.$el.offsetWidth / 5;
      const thresholdY = this.$el.offsetHeight / 5;
      const top = moveY < -thresholdY;
      const right = moveX > thresholdX;
      const bottom = moveY > thresholdY;
      const left = moveX < -thresholdX;
      const done = () => {
        if (this.pauseOnEnter) {
          this.play();
        }
      };
      let prev = false;
      let next = false;

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
    },
  },

  render(createElement) {
    return createElement(
      this.tag,

      {
        class: {
          carousel: true,
          [`carousel--${this.direction}`]: this.direction,
          'carousel--slidable': this.slideOnSwipe,
          'carousel--controls': this.controls === 'hover',
          'carousel--indicators': this.indicators === 'hover',
        },

        on: {
          ...this.$listeners,
          ...(this.pauseOnEnter ? {
            [EVENT_POINTER_ENTER]: this.pause,
            [EVENT_POINTER_LEAVE]: this.cycle,
          } : {}),
          ...(this.slideOnSwipe ? {
            [EVENT_POINTER_DOWN]: this.slideStart,
            [EVENT_POINTER_MOVE]: this.slideMove,
            [EVENT_POINTER_UP]: this.slideEnd,
          } : {}),
        },
      },

      this.list.length === 0 ? [] : [
        createElement(
          'ul',

          {
            class: 'carousel__list',
          },

          this.list.map((item, index) => createElement(
            'li',

            {
              attrs: {
                'data-index': index,
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
                'carousel__item--to-left': item.toLeft,
              },
            },

            [
              createElement(createVueComponent(item.content, {
                data: item.raw,
              })),
            ],
          )),
        ),

        this.indicators ? createElement(
          'ol',

          {
            class: {
              carousel__indicators: true,
              [`carousel__indicators--${this.indicatorType}`]: this.indicatorType,
            },
          },

          this.list.map((item, index) => createElement(
            'li',

            {
              attrs: {
                'data-slide-to': index,
              },

              class: {
                carousel__indicator: true,
                'carousel__indicator--active': item.sliding,
              },

              on: (() => {
                const listeners = {};
                const slide = () => {
                  this.slideTo(index);
                };

                if (this.indicatorTrigger === 'hover') {
                  listeners.touchstart = slide;
                  listeners[EVENT_POINTER_ENTER] = slide;
                } else {
                  listeners.click = slide;
                }

                return listeners;
              })(),
            },
          )),
        ) : '',

        this.controls ? createElement(
          'button',

          {
            attrs: {
              'data-slide': 'prev',
            },

            class: 'carousel__control carousel__control--prev',

            on: {
              click: () => {
                if (['right', 'down'].indexOf(this.direction) > -1) {
                  this.next();
                } else {
                  this.prev();
                }
              },
            },
          },
        ) : '',

        this.controls ? createElement(
          'button',

          {
            attrs: {
              'data-slide': 'next',
            },

            class: 'carousel__control carousel__control--next',

            on: {
              click: () => {
                if (['right', 'down'].indexOf(this.direction) > -1) {
                  this.prev();
                } else {
                  this.next();
                }
              },
            },
          },
        ) : '',
      ],
    );
  },
};
</script>

<style lang="scss" scoped>
  .carousel {
    position: relative;
    user-select: none;

    &--slidable {
      touch-action: none;
    }

    &--up,
    &--down {
      > .carousel__indicators {
        bottom: auto;
        flex-direction: column;
        left: auto;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);

        > .carousel__indicator {
          &::before {
            height: 100%;
            width: 0.125rem;
          }
        }
      }

      > .carousel__indicators--disc {
        > .carousel__indicator {
          height: 0.75rem;
          width: 1.5rem;

          &::before {
            height: 0.5rem;
            width: 0.5rem;
          }
        }
      }
    }

    &--right {
      > .carousel__indicators {
        flex-direction: row-reverse;
      }
    }

    &--down {
      > .carousel__indicators {
        flex-direction: column-reverse;
      }
    }

    &--controls {
      &:hover {
        > .carousel__control {
          opacity: 0.5;
          transform: translateX(0);
          z-index: 1;

          &:focus,
          &:hover {
            opacity: 1;
          }
        }
      }

      > .carousel__control {
        opacity: 0;
        z-index: -1;
      }

      > .carousel__control--prev {
        transform: translateX(-50%);
      }

      > .carousel__control--next {
        transform: translateX(50%);
      }
    }

    &--indicators {
      &:hover {
        > .carousel__indicators {
          opacity: 1;
          z-index: 1;
        }
      }

      > .carousel__indicators {
        opacity: 0;
        transition: opacity 0.15s;
        z-index: -1;
      }
    }

    &__list {
      margin: 0;
      overflow: hidden;
      padding: 0;
      position: relative;
      width: 100%;
    }

    &__item {
      display: none;
      margin: 0;

      &--active,
      &--top,
      &--right,
      &--bottom,
      &--left {
        display: block;
        transition: transform 0.6s ease-in-out;
        width: 100%;
      }

      &--top,
      &--right,
      &--bottom,
      &--left {
        left: 0;
        position: absolute;
        top: 0;
      }

      &--top {
        transform: translateY(-100%);

        &.carousel__item--to-bottom {
          transform: translateY(0);
        }
      }

      &--right {
        transform: translateX(100%);

        &.carousel__item--to-left {
          transform: translateX(0);
        }
      }

      &--bottom {
        transform: translateY(100%);

        &.carousel__item--to-top {
          transform: translateY(0);
        }
      }

      &--left {
        transform: translateX(-100%);

        &.carousel__item--to-right {
          transform: translateX(0);
        }
      }

      &--active {
        transform: translate(0, 0);
        z-index: 1;

        &.carousel__item--to-top {
          transform: translateY(-100%);
        }

        &.carousel__item--to-right {
          transform: translateX(100%);
        }

        &.carousel__item--to-bottom {
          transform: translateY(100%);
        }

        &.carousel__item--to-left {
          transform: translateX(-100%);
        }
      }
    }

    &__indicators {
      bottom: 0;
      display: flex;
      justify-content: center;
      left: 50%;
      list-style: none;
      margin: 0;
      padding: 0;
      position: absolute;
      transform: translateX(-50%);
      z-index: 1;

      &--disc {
        > .carousel__indicator {
          width: 0.75rem;

          &::before {
            border-radius: 50%;
            height: 0.5rem;
            width: 0.5rem;
          }
        }
      }
    }

    &__indicator {
      cursor: pointer;
      height: 1.5rem;
      margin: 0.125rem;
      opacity: 0.5;
      position: relative;
      transition: opacity 0.15s;
      width: 1.5rem;

      &::before {
        background-color: #fff;
        content: "";
        display: block;
        height: 0.125rem;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
      }

      &--active {
        opacity: 1;
      }
    }

    &__control {
      background-color: rgba(0, 0, 0, 0.5);
      border: 0;
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      height: 2rem;
      margin-top: -1rem;
      opacity: 0.5;
      padding: 0.5rem;
      position: absolute;
      top: 50%;
      transition: all 0.15s;
      width: 2rem;

      &:focus,
      &:hover {
        opacity: 1;
      }

      &:focus {
        outline: none;
      }

      &::before {
        border: 0.0625rem solid transparent;
        border-radius: 0.125rem;
        content: "";
        display: block;
        height: 0.5rem;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 0.5rem;
      }

      &--prev {
        left: 1rem;

        &::before {
          border-bottom-color: #fff;
          border-left-color: #fff;
          margin-left: 0.125rem;
        }
      }

      &--next {
        right: 1rem;

        &::before {
          border-right-color: #fff;
          border-top-color: #fff;
          margin-left: -0.125rem;
        }
      }
    }
  }
</style>
