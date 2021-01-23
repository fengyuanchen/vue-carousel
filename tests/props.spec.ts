import { h } from 'vue';
import { mount } from '@vue/test-utils';
import VueCarousel from '../src';

describe('props', () => {
  describe('autoplay', () => {
    it('should play automatically by default', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
        },
      });

      expect(wrapper.props('autoplay')).toBe(true);
      expect(wrapper.vm.playing).toBe(true);
    });

    it('should not play automatically', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          autoplay: false,
          data: ['1', '2', '3'],
        },
      });

      expect(wrapper.props('autoplay')).toBe(false);
      expect(wrapper.vm.playing).toBe(false);
    });
  });

  describe('controls', () => {
    it('should show controls', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          controls: true,
          data: ['1', '2', '3'],
        },
      });

      expect(wrapper.props('controls')).toBe(true);
      expect(wrapper.findAll('.vue-carousel__control')).toHaveLength(2);
    });

    it('should hide controls', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          controls: false,
          data: ['1', '2', '3'],
        },
      });

      expect(wrapper.props('controls')).toBe(false);
      expect(wrapper.findAll('.vue-carousel__control')).toHaveLength(0);
    });

    it('should switch to the previous slide on click the previous control', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          controls: true,
          data: ['1', '2', '3'],
          internal: 100,
        },
      });

      wrapper.find('.vue-carousel__control--prev').trigger('click');
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(2);
        done();
      }, 1000);
    });

    it('should switch to the next slide on click the next control', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          controls: true,
          data: ['1', '2', '3'],
          internal: 100,
        },
      });

      wrapper.find('.vue-carousel__control--next').trigger('click');
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(1);
        done();
      }, 1000);
    });
  });

  describe('data', () => {
    it('should support text', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['content'],
        },
      });

      expect(wrapper.find('.vue-carousel__item').text()).toBe('content');
    });

    it('should support html', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['<div>content</div>'],
        },
      });

      expect(wrapper.find('.vue-carousel__item').text()).toBe('content');
    });

    it('should support component', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: [
            () => h('div', 'content'),
          ],
        },
      });

      expect(wrapper.find('.vue-carousel__item').text()).toBe('content');
    });
  });

  describe('direction', () => {
    it('should be "left" be default', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
          interval: 100,
        },
      });

      expect(wrapper.props('direction')).toBe('left');
      expect(wrapper.classes()).toContain('vue-carousel--left');
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(1);
        wrapper.trigger(window.PointerEvent ? 'pointerdown' : 'mousedown');
        wrapper.trigger(window.PointerEvent ? 'pointermove' : 'mousemove');
        wrapper.trigger(window.PointerEvent ? 'pointerup' : 'mouseup');
        done();
      }, 1000);
    });

    it('should be "right"', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
          direction: 'right',
          interval: 100,
        },
      });

      expect(wrapper.props('direction')).toBe('right');
      expect(wrapper.classes()).toContain('vue-carousel--right');
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(1);
        wrapper.trigger(window.PointerEvent ? 'pointerdown' : 'mousedown');
        wrapper.trigger(window.PointerEvent ? 'pointermove' : 'mousemove');
        wrapper.trigger(window.PointerEvent ? 'pointerup' : 'mouseup');
        done();
      }, 1000);
    });

    it('should be "up"', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
          direction: 'up',
          interval: 100,
        },
      });

      expect(wrapper.props('direction')).toBe('up');
      expect(wrapper.classes()).toContain('vue-carousel--up');
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(1);
        wrapper.trigger(window.PointerEvent ? 'pointerdown' : 'mousedown');
        wrapper.trigger(window.PointerEvent ? 'pointermove' : 'mousemove');
        wrapper.trigger(window.PointerEvent ? 'pointerup' : 'mouseup');
        done();
      }, 1000);
    });

    it('should be "down"', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
          direction: 'down',
          interval: 100,
        },
      });

      expect(wrapper.props('direction')).toBe('down');
      expect(wrapper.classes()).toContain('vue-carousel--down');
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(1);
        wrapper.trigger(window.PointerEvent ? 'pointerdown' : 'mousedown');
        wrapper.trigger(window.PointerEvent ? 'pointermove' : 'mousemove');
        wrapper.trigger(window.PointerEvent ? 'pointerup' : 'mouseup');
        done();
      }, 1000);
    });
  });

  describe('indicators', () => {
    it('should show indicators be default', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
        },
      });

      expect(wrapper.props('indicators')).toBe(true);
      expect(wrapper.find('.vue-carousel__indicators').exists()).toBe(true);
    });

    it('should hide indicators', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
          indicators: false,
        },
      });

      expect(wrapper.props('indicators')).toBe(false);
      expect(wrapper.find('.vue-carousel__indicators').exists()).toBe(false);
    });
  });

  describe('indicator-trigger', () => {
    it('should switch to the last slide on click the last indicator by default', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
        },
      });

      expect(wrapper.props('indicatorTrigger')).toBe('click');
      wrapper.find('.vue-carousel__indicator:last-child').trigger('click');
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(2);
        done();
      }, 1000);
    });

    it('should switch to the last slide on hover the last indicator', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
          indicatorTrigger: 'hover',
        },
      });

      expect(wrapper.props('indicatorTrigger')).toBe('hover');
      wrapper.find('.vue-carousel__indicator:last-child').trigger(window.PointerEvent ? 'pointerenter' : 'mouseenter');
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(2);
        done();
      }, 1000);
    });
  });

  describe('indicator-type', () => {
    it('should be "line" be default', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
        },
      });

      expect(wrapper.props('indicatorType')).toBe('line');
      expect(wrapper.find('.vue-carousel__indicators--line').exists()).toBe(true);
    });

    it('should be "disc"', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
          indicatorType: 'disc',
        },
      });

      expect(wrapper.props('indicatorType')).toBe('disc');
      expect(wrapper.find('.vue-carousel__indicators--disc').exists()).toBe(true);
    });
  });

  describe('interval', () => {
    it('should be 5000 by default', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
        },
      });

      expect(wrapper.props('interval')).toBe(5000);
    });

    it('should switch to next slide after the given interval time', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
          interval: 500,
        },
      });

      expect(wrapper.props('interval')).toBe(500);
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(1);
        done();
      }, 1200);
    });
  });

  describe('pauseOnEnter', () => {
    it('should be `true` by default', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
          interval: 100,
        },
      });

      expect(wrapper.props('pauseOnEnter')).toBe(true);
      wrapper.trigger(window.PointerEvent ? 'pointerenter' : 'mouseenter');
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(0);
        done();
      }, 1000);
    });

    it('should be `false`', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
          interval: 100,
          pauseOnEnter: false,
        },
      });

      expect(wrapper.props('pauseOnEnter')).toBe(false);
      wrapper.trigger(window.PointerEvent ? 'pointerenter' : 'mouseenter');
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(1);
        done();
      }, 1000);
    });
  });

  describe('slideOnSwipe', () => {
    it('should be `true` by default', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          autoplay: false,
          data: ['1', '2', '3'],
        },
      });

      expect(wrapper.props('slideOnSwipe')).toBe(true);
      wrapper.trigger(window.PointerEvent ? 'pointerdown' : 'mousedown');
      wrapper.trigger(window.PointerEvent ? 'pointermove' : 'mousemove');
      wrapper.trigger(window.PointerEvent ? 'pointerup' : 'mouseup');
    });

    it('should be `false`', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          autoplay: false,
          data: ['1', '2', '3'],
          slideOnSwipe: false,
        },
      });

      expect(wrapper.props('slideOnSwipe')).toBe(false);
    });
  });

  describe('tag', () => {
    it('should be "div" be default', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
        },
      });

      expect(wrapper.vm.$el.tagName.toLowerCase()).toBe('div');
    });

    it('should match the given tag', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
          tag: 'span',
        },
      });

      expect(wrapper.vm.$el.tagName.toLowerCase()).toBe('span');
    });
  });
});
