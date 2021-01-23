import { mount } from '@vue/test-utils';
import VueCarousel from '../src';

describe('methods', () => {
  describe('play', () => {
    it('should play when execute the method', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          autoplay: false,
          data: ['1', '2', '3'],
        },
      });

      wrapper.vm.play();
      expect(wrapper.vm.playing).toBe(true);
    });
  });

  describe('stop', () => {
    it('should stop when execute the method', () => {
      const wrapper = mount(VueCarousel, {
        props: {
          data: ['1', '2', '3'],
        },
      });

      wrapper.vm.stop();
      expect(wrapper.vm.playing).toBe(false);
    });
  });

  describe('prev', () => {
    it('should switch to previous slide when execute the method', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          autoplay: false,
          data: ['1', '2', '3'],
        },
      });

      wrapper.vm.prev();
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(2);
        done();
      }, 1000);
    });
  });

  describe('next', () => {
    it('should switch to next slide when execute the method', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          autoplay: false,
          data: ['1', '2', '3'],
        },
      });

      wrapper.vm.next();
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(1);
        done();
      }, 1000);
    });
  });

  describe('slideTo', () => {
    it('should switch to last slide', (done) => {
      const wrapper = mount(VueCarousel, {
        props: {
          autoplay: false,
          data: ['1', '2', '3'],
        },
      });

      wrapper.vm.slideTo(2);
      setTimeout(() => {
        expect(wrapper.vm.index).toBe(2);
        done();
      }, 1000);
    });
  });
});
