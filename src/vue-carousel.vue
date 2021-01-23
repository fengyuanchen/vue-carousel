<script lang="ts">
import { Component, defineComponent, h } from 'vue';

const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
const IS_TOUCH_DEVICE = IS_BROWSER && window.document.documentElement ? 'ontouchstart' in window.document.documentElement : false;
const HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in window : false;
const ON_TOUCH_START = IS_TOUCH_DEVICE ? 'ontouchstart' : 'onmousedown';
const ON_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'ontouchmove' : 'onmousemove';
const ON_TOUCH_END = IS_TOUCH_DEVICE ? 'ontouchend' : 'onmouseup';
const ON_POINTER_DOWN = HAS_POINTER_EVENT ? 'onpointerdown' : ON_TOUCH_START;
const ON_POINTER_MOVE = HAS_POINTER_EVENT ? 'onpointermove' : ON_TOUCH_MOVE;
const ON_POINTER_UP = HAS_POINTER_EVENT ? 'onpointerup' : ON_TOUCH_END;
const ON_POINTER_ENTER = HAS_POINTER_EVENT ? 'onpointerenter' : 'onmouseenter';
const ON_POINTER_LEAVE = HAS_POINTER_EVENT ? 'onpointerleave' : 'onmouseleave';
const createVueComponent = (content: unknown): Component => {
  if ((typeof content === 'object' && content !== null) || typeof content === 'function') {
    return content as Component;
  }

  return {
    template: String(content),
  };
};

interface VueCarouselItem {
  active: boolean;
  bottom: boolean;
  content: any;
  left: boolean;
  raw: any;
  right: boolean;
  sliding: boolean;
  toBottom: boolean;
  toLeft: boolean;
  toRight: boolean;
  toTop: boolean;
  top: boolean;
}

type VueCarouselList = VueCarouselItem[];

export default defineComponent({
  name: 'VueCarousel',

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
      list: [] as VueCarouselList,
      onVisibilityChange: () => {},
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

  beforeUnmount() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  },

  methods: {
    init() {
      const { data } = this;
      const list: VueCarouselList = [];

      if (data && data.length > 0) {
        const maxIndex = data.length - 1;

        // In case the number of the data list is reduced (#23).
        if (this.index > maxIndex) {
          this.index = maxIndex;
        }

        data.forEach((rawItem: any, index) => {
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
      if (this.playing) {
        this.pause();
        this.timeout = window.setTimeout(() => {
          this.next(() => {
            this.cycle();
          });
        }, this.interval);
      }
    },

    pause() {
      window.clearTimeout(this.timeout);
      this.timeout = 0;
    },

    stop() {
      if (this.playing) {
        this.pause();
        this.playing = false;
      }
    },

    prev(done?: () => void) {
      this.slideTo(this.index - 1, done);
    },

    next(done?: () => void) {
      this.slideTo(this.index + 1, done);
    },

    slide(index: number, reverse = false, done = () => {}) {
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

    slideTo(index: number, done?: () => void) {
      if (index === this.index) {
        return;
      }

      this.slide(index, index < this.index, done);
    },

    slideStart(event: PointerEvent | TouchEvent | MouseEvent) {
      const touch = (event as TouchEvent).touches ? (event as TouchEvent).touches[0] : null;

      if (this.playing && this.pauseOnEnter) {
        this.stop();
      }

      this.startX = touch ? touch.pageX : (event as PointerEvent).pageX;
      this.startY = touch ? touch.pageY : (event as PointerEvent).pageY;
    },

    slideMove(event: PointerEvent | TouchEvent | MouseEvent) {
      const touch = (event as TouchEvent).touches ? (event as TouchEvent).touches[0] : null;

      event.preventDefault();
      this.endX = touch ? touch.pageX : (event as PointerEvent).pageX;
      this.endY = touch ? touch.pageY : (event as PointerEvent).pageY;
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
        if (!this.playing && this.pauseOnEnter) {
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

  render() {
    return h(
      this.tag,

      {
        class: {
          'vue-carousel': true,
          [`vue-carousel--${this.direction}`]: this.direction,
          'vue-carousel--slidable': this.slideOnSwipe,
          'vue-carousel--controls': this.controls === 'hover',
          'vue-carousel--indicators': this.indicators === 'hover',
        },

        ...(this.pauseOnEnter ? {
          [ON_POINTER_ENTER]: this.pause,
          [ON_POINTER_LEAVE]: this.cycle,
        } : {}),
        ...(this.slideOnSwipe ? {
          [ON_POINTER_DOWN]: this.slideStart,
          [ON_POINTER_MOVE]: this.slideMove,
          [ON_POINTER_UP]: this.slideEnd,
        } : {}),
      },

      this.list.length === 0 ? [] : [
        h(
          'ul',

          {
            class: 'vue-carousel__list',
          },

          this.list.map((item, index) => h(
            'li',

            {
              'data-index': index,

              class: {
                'vue-carousel__item': true,
                'vue-carousel__item--active': item.active,
                'vue-carousel__item--top': item.top,
                'vue-carousel__item--right': item.right,
                'vue-carousel__item--bottom': item.bottom,
                'vue-carousel__item--left': item.left,
                'vue-carousel__item--to-top': item.toTop,
                'vue-carousel__item--to-right': item.toRight,
                'vue-carousel__item--to-bottom': item.toBottom,
                'vue-carousel__item--to-left': item.toLeft,
              },
            },

            [
              h(createVueComponent(item.content)),
            ],
          )),
        ),

        this.indicators ? h(
          'ol',

          {
            class: {
              'vue-carousel__indicators': true,
              [`vue-carousel__indicators--${this.indicatorType}`]: this.indicatorType,
            },
          },

          this.list.map((item, index) => h(
            'li',

            {
              'data-slide-to': index,

              class: {
                'vue-carousel__indicator': true,
                'vue-carousel__indicator--active': item.sliding,
              },

              ...(() => {
                const listeners: any = {};
                const slide = () => {
                  this.slideTo(index);
                };

                if (this.indicatorTrigger === 'hover') {
                  listeners[ON_POINTER_ENTER] = slide;

                  if (IS_TOUCH_DEVICE && !HAS_POINTER_EVENT) {
                    listeners[ON_TOUCH_START] = slide;
                  }
                } else {
                  listeners.onclick = slide;
                }

                return listeners;
              })(),
            },
          )),
        ) : '',

        this.controls ? h(
          'button',

          {
            type: 'button',
            'data-slide': 'prev',
            class: 'vue-carousel__control vue-carousel__control--prev',

            onclick: () => {
              if (['right', 'down'].indexOf(this.direction) > -1) {
                this.next();
              } else {
                this.prev();
              }
            },
          },
        ) : '',

        this.controls ? h(
          'button',

          {
            type: 'button',
            'data-slide': 'next',
            class: 'vue-carousel__control vue-carousel__control--next',

            onclick: () => {
              if (['right', 'down'].indexOf(this.direction) > -1) {
                this.prev();
              } else {
                this.next();
              }
            },
          },
        ) : '',
      ],
    );
  },
});
</script>

<style lang="scss">
.vue-carousel {
  position: relative;
  user-select: none;

  &--slidable {
    touch-action: none;
  }

  &--up,
  &--down {
    > .vue-carousel__indicators {
      bottom: auto;
      flex-direction: column;
      left: auto;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);

      > .vue-carousel__indicator {
        &::before {
          height: 100%;
          width: 0.125rem;
        }
      }
    }

    > .vue-carousel__indicators--disc {
      > .vue-carousel__indicator {
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
    > .vue-carousel__indicators {
      flex-direction: row-reverse;
    }
  }

  &--down {
    > .vue-carousel__indicators {
      flex-direction: column-reverse;
    }
  }

  &--controls {
    &:hover {
      > .vue-carousel__control {
        opacity: 0.5;
        transform: translateX(0);
        z-index: 1;

        &:focus,
        &:hover {
          opacity: 1;
        }
      }
    }

    > .vue-carousel__control {
      opacity: 0;
      z-index: -1;
    }

    > .vue-carousel__control--prev {
      transform: translateX(-50%);
    }

    > .vue-carousel__control--next {
      transform: translateX(50%);
    }
  }

  &--indicators {
    &:hover {
      > .vue-carousel__indicators {
        opacity: 1;
        z-index: 1;
      }
    }

    > .vue-carousel__indicators {
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

      &.vue-carousel__item--to-bottom {
        transform: translateY(0);
      }
    }

    &--right {
      transform: translateX(100%);

      &.vue-carousel__item--to-left {
        transform: translateX(0);
      }
    }

    &--bottom {
      transform: translateY(100%);

      &.vue-carousel__item--to-top {
        transform: translateY(0);
      }
    }

    &--left {
      transform: translateX(-100%);

      &.vue-carousel__item--to-right {
        transform: translateX(0);
      }
    }

    &--active {
      transform: translate(0, 0);
      z-index: 1;

      &.vue-carousel__item--to-top {
        transform: translateY(-100%);
      }

      &.vue-carousel__item--to-right {
        transform: translateX(100%);
      }

      &.vue-carousel__item--to-bottom {
        transform: translateY(100%);
      }

      &.vue-carousel__item--to-left {
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
      > .vue-carousel__indicator {
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
