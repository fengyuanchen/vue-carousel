import { mount } from '@vue/test-utils';
import VueCarousel from '../src';

describe('events', () => {
  describe('slide', () => {
    it('should emit the `slide` event', (done) => {
      mount({
        components: {
          VueCarousel,
        },
        data() {
          return {
            data: ['1', '2', '3'],
          };
        },
        mounted() {
          (this.$refs.carousel as any).slideTo(1);
        },
        methods: {
          onSlide(newIndex: number, oldIndex: number) {
            expect(newIndex).toBe(1);
            expect(oldIndex).toBe(0);
            done();
          },
        },
        template: '<vue-carousel ref="carousel" :data="data" :autoplay="false" @slide="onSlide" />',
      });
    });
  });

  describe('slid', () => {
    it('should emit the `slid` event', (done) => {
      mount({
        components: {
          VueCarousel,
        },
        data() {
          return {
            data: ['1', '2', '3'],
          };
        },
        mounted() {
          (this.$refs.carousel as any).slideTo(1);
        },
        methods: {
          onSlid(newIndex: number, oldIndex: number) {
            expect(newIndex).toBe(1);
            expect(oldIndex).toBe(0);
            done();
          },
        },
        template: '<vue-carousel ref="carousel" :data="data" :autoplay="false" @slid="onSlid" />',
      });
    });
  });
});
