import Vue from 'vue';
import VueCarousel from '../src';

Vue.component(VueCarousel.name, VueCarousel);

describe('<carousel>', () => {
  describe('props', () => {
    describe('autoplay', () => {
      it('should play automatically by default', () => {
        const vm = new Vue({
          template: '<carousel :data="[1, 2, 3]" ref="carousel"></carousel>',
        }).$mount();

        expect(vm.$refs.carousel.playing).to.be.true;
      });

      it('should not play automatically', () => {
        const vm = new Vue({
          template: '<carousel :autoplay="false" :data="[1, 2, 3]" ref="carousel"></carousel>',
        }).$mount();

        expect(vm.$refs.carousel.playing).to.be.false;
      });
    });

    describe('controls', () => {
      it('should show controls', () => {
        const vm = new Vue({
          template: '<carousel :controls="true" :data="[1, 2, 3]"></carousel>',
        }).$mount();

        expect(vm.$el.querySelectorAll('.carousel__control').length).to.equal(2);
      });

      it('should hide controls', () => {
        const vm = new Vue({
          template: '<carousel :controls="false" :data="[1, 2, 3]"></carousel>',
        }).$mount();

        expect(vm.$el.querySelectorAll('.carousel__control').length).to.equal(0);
      });
    });

    describe('data', () => {
      it('should support text as content', () => {
        const vm = new Vue({
          data() {
            return {
              data: [
                'content',
              ],
            };
          },

          template: '<carousel :data="data"></carousel>',
        }).$mount();

        expect(vm.$el.querySelector('.carousel__item').textContent).to.equal('content');
      });

      it('should support html as content', () => {
        const vm = new Vue({
          data() {
            return {
              data: [
                '<div>content</div>',
              ],
            };
          },

          template: '<carousel :data="data"></carousel>',
        }).$mount();

        expect(vm.$el.querySelector('.carousel__item').textContent).to.equal('content');
      });

      it('should support vue component as content', () => {
        const vm = new Vue({
          data() {
            return {
              data: [
                {
                  template: '<div>content</div>',
                },
              ],
            };
          },

          template: '<carousel :data="data"></carousel>',
        }).$mount();

        expect(vm.$el.querySelector('.carousel__item').textContent).to.equal('content');
      });

      it('should support render function as content', () => {
        const vm = new Vue({
          data() {
            return {
              data: [
                createElement => createElement('div', ['content']),
              ],
            };
          },

          template: '<carousel :data="data"></carousel>',
        }).$mount();

        expect(vm.$el.querySelector('.carousel__item').textContent).to.equal('content');
      });

      it('should support plain object as content', () => {
        const vm = new Vue({
          data() {
            return {
              data: [
                {
                  content: 'content',
                },
              ],
            };
          },

          template: '<carousel :data="data"></carousel>',
        }).$mount();

        expect(vm.$el.querySelector('.carousel__item').textContent).to.equal('content');
      });
    });

    describe('direction', () => {
      it('should be "left" be default', () => {
        const vm = new Vue({
          template: '<carousel :data="[1, 2, 3]"></carousel>',
        }).$mount();

        expect(vm.$el.classList.contains('carousel--left')).to.be.true;
      });

      it('should be "top"', () => {
        const vm = new Vue({
          template: '<carousel :data="[1, 2, 3]" direction="top"></carousel>',
        }).$mount();

        expect(vm.$el.classList.contains('carousel--top')).to.be.true;
      });
    });

    describe('indicators', () => {
      it('should show indicators be default', () => {
        const vm = new Vue({
          template: '<carousel :data="[1, 2, 3]"></carousel>',
        }).$mount();

        expect(vm.$el.querySelector('.carousel__indicators')).to.not.be.null;
      });

      it('should hide indicators', () => {
        const vm = new Vue({
          template: '<carousel :data="[1, 2, 3]" :indicators="false"></carousel>',
        }).$mount();

        expect(vm.$el.querySelector('.carousel__indicators')).to.be.null;
      });
    });

    describe('indicator-trigger', () => {
      it('should switch the last slide on click the last indicator by default', (done) => {
        const vm = new Vue({
          template: '<carousel :data="[1, 2, 3]" ref="carousel"></carousel>',
        }).$mount();

        vm.$el.querySelector('.carousel__indicator:last-child').click();

        setTimeout(() => {
          expect(vm.$refs.carousel.index).to.equal(2);
          done();
        }, 1000);
      });
    });

    describe('indicator-type', () => {
      it('should be "line" be default', () => {
        const vm = new Vue({
          template: '<carousel :data="[1, 2, 3]"></carousel>',
        }).$mount();

        expect(vm.$el.querySelector('.carousel__indicators--line')).to.not.be.null;
      });

      it('should be "disc"', () => {
        const vm = new Vue({
          template: '<carousel :data="[1, 2, 3]" indicator-type="disc"></carousel>',
        }).$mount();

        expect(vm.$el.querySelector('.carousel__indicators--disc')).to.not.be.null;
      });
    });

    describe('interval', () => {
      it('should switch to next slide after the given interval time', (done) => {
        const vm = new Vue({
          template: '<carousel :data="[1, 2, 3]" :interval="500" ref="carousel"></carousel>',
        }).$mount();

        setTimeout(() => {
          expect(vm.$refs.carousel.index).to.equal(1);
          done();
        }, 1200);
      });
    });

    describe('tag', () => {
      it('should be "div" be default', () => {
        const vm = new Vue({
          template: '<carousel :data="[1, 2, 3]"></carousel>',
        }).$mount();

        expect(vm.$el.tagName.toLowerCase()).to.equal('div');
      });

      it('should match the given tag', () => {
        const vm = new Vue({
          template: '<carousel :data="[1, 2, 3]" tag="span"></carousel>',
        }).$mount();

        expect(vm.$el.tagName.toLowerCase()).to.equal('span');
      });
    });
  });

  describe('methods', () => {
    describe('play', () => {
      it('should play when execute the method', () => {
        const vm = new Vue({
          template: '<carousel :autoplay="false" :data="[1, 2, 3]" ref="carousel"></carousel>',
        }).$mount();

        vm.$refs.carousel.play();
        expect(vm.$refs.carousel.playing).to.be.true;
      });
    });

    describe('stop', () => {
      it('should stop when execute the method', () => {
        const vm = new Vue({
          template: '<carousel :data="[1, 2, 3]" ref="carousel"></carousel>',
        }).$mount();

        vm.$refs.carousel.stop();
        expect(vm.$refs.carousel.playing).to.be.false;
      });
    });

    describe('prev', () => {
      it('should switch to previous slide when execute the method', (done) => {
        const vm = new Vue({
          template: '<carousel :autoplay="false" :data="[1, 2, 3]" ref="carousel"></carousel>',
        }).$mount();

        vm.$refs.carousel.prev();

        setTimeout(() => {
          expect(vm.$refs.carousel.index).to.equal(2);
          done();
        }, 1000);
      });
    });

    describe('next', () => {
      it('should switch to next slide when execute the method', (done) => {
        const vm = new Vue({
          template: '<carousel :autoplay="false" :data="[1, 2, 3]" ref="carousel"></carousel>',
        }).$mount();

        vm.$refs.carousel.next();

        setTimeout(() => {
          expect(vm.$refs.carousel.index).to.equal(1);
          done();
        }, 1000);
      });
    });

    describe('slideTo', () => {
      it('should switch to last slide', (done) => {
        const vm = new Vue({
          template: '<carousel :autoplay="false" :data="[1, 2, 3]" ref="carousel"></carousel>',
        }).$mount();

        vm.$refs.carousel.slideTo(2);

        setTimeout(() => {
          expect(vm.$refs.carousel.index).to.equal(2);
          done();
        }, 1000);
      });
    });
  });
});
