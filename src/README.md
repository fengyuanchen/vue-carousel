# Carousel

## Basic usage

```html
<template>
  <carousel :data="data"></carousel>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          '<div class="example-slide">Slide 1</div>',
          '<div class="example-slide">Slide 2</div>',
          '<div class="example-slide">Slide 3</div>',
        ],
      };
    },
  };
</script>

<style>
  .example-slide {
    align-items: center;
    background-color: #666;
    color: #999;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    min-height: 10rem;
  }
</style>
```

## Advanced usage

```html
<template>
  <div class="broadcast">
    <feather type="radio"></feather>
    <carousel :data="data" :controls="false" :indicators="false" :interval="3000" direction="up"></carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
            id: 1,
            message: 'Rolling broadcast message',
            content(createElement, content) {
              return createElement('a', {
                attrs: {
                  href: '#',
                },

                class: 'broadcast-content',
              }, [
                createElement('span', [`${content.message} ${content.id}`]),
                createElement('feather', {
                  props: {
                    size: 16,
                    type: 'chevron-right',
                  },
                }),
              ]);
            },
          },
          {
            id: 2,
            message: 'Rolling broadcast message',
            content(createElement, content) {
              return createElement('a', {
                attrs: {
                  href: '#',
                },

                class: 'broadcast-content',
              }, [
                createElement('span', [`${content.message} ${content.id}`]),
                createElement('feather', {
                  props: {
                    size: 16,
                    type: 'chevron-right',
                  },
                }),
              ]);
            },
          },
          {
            id: 3,
            message: 'Rolling broadcast message',
            content(createElement, content) {
              return createElement('a', {
                attrs: {
                  href: '#',
                },

                class: 'broadcast-content',
              }, [
                createElement('span', [`${content.message} ${content.id}`]),
                createElement('feather', {
                  props: {
                    size: 16,
                    type: 'chevron-right',
                  },
                }),
              ]);
            },
          },
        ],
      };
    },
  };
</script>

<style scoped>
  .broadcast {
    border: 1px solid #eee;
    border-radius: 0.25rem;
    display: flex;
    padding: 0.5rem 0.75rem;
  }

  .broadcast > .feather {
    margin-right: 0.5rem;
  }

  .broadcast > .carousel {
    flex: 1;
  }

  .broadcast-content {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
</style>
```

## Directions

```html
<template>
  <div class="row">
    <div class="col-sm">
      <carousel :data="data"></carousel>
    </div>
    <div class="col-sm mt-3 mt-sm-0">
      <carousel :data="data" direction="right"></carousel>
    </div>
    <div class="col-sm mt-3 mt-sm-0">
      <carousel :data="data" direction="up"></carousel>
    </div>
    <div class="col-sm mt-3 mt-sm-0">
      <carousel :data="data" direction="down"></carousel>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
            content: this.content,
          },
          {
            content: this.content,
          },
          {
            content: this.content,
          },
        ],
      };
    },

    methods: {
      content(createElement, data, vm) {
        return createElement('div', {
          class: 'example-slide',
        }, [`Slide ${vm.$parent.direction}`]);
      },
    },
  };
</script>
```

## Controls

### Without controls

```html
<template>
  <carousel :data="data" :controls="false"></carousel>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          '<div class="example-slide">Slide 1</div>',
          '<div class="example-slide">Slide 2</div>',
          '<div class="example-slide">Slide 3</div>',
        ],
      };
    },
  };
</script>
```

### Static controls

```html
<template>
  <carousel :data="data" :controls="true"></carousel>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          '<div class="example-slide">Slide 1</div>',
          '<div class="example-slide">Slide 2</div>',
          '<div class="example-slide">Slide 3</div>',
        ],
      };
    },
  };
</script>
```

## Indicators

### Without indicators

```html
<template>
  <carousel :data="data" :indicators="false"></carousel>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          '<div class="example-slide">Slide 1</div>',
          '<div class="example-slide">Slide 2</div>',
          '<div class="example-slide">Slide 3</div>',
        ],
      };
    },
  };
</script>
```

### Show indicators on hover

```html
<template>
  <carousel :data="data" indicators="hover"></carousel>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          '<div class="example-slide">Slide 1</div>',
          '<div class="example-slide">Slide 2</div>',
          '<div class="example-slide">Slide 3</div>',
        ],
      };
    },
  };
</script>
```

### Indicator Triggers

```html
<template>
  <div class="row">
    <div class="col-sm">
      <carousel :data="data"></carousel>
    </div>
    <div class="col-sm mt-3 mt-sm-0">
      <carousel :data="data" indicator-trigger="hover"></carousel>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          '<div class="example-slide">Slide 1</div>',
          '<div class="example-slide">Slide 2</div>',
          '<div class="example-slide">Slide 3</div>',
        ],
      };
    },
  };
</script>
```

### Indicator types

```html
<template>
  <div class="row">
    <div class="col-sm">
      <carousel :data="data"></carousel>
    </div>
    <div class="col-sm mt-3 mt-sm-0">
      <carousel :data="data" indicator-type="disc"></carousel>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          '<div class="example-slide">Slide 1</div>',
          '<div class="example-slide">Slide 2</div>',
          '<div class="example-slide">Slide 3</div>',
        ],
      };
    },
  };
</script>
```

## Props

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| autoplay | `Boolean` | `true` | - | Indicates if play the slides automatically once mounted. |
| controls | `Boolean` \| `String` | `'hover'` | false, true, hover | Whether to show or how to show the prev and next controls. |
| data | `Array` | - | - | The slides data of the carousel. |
| direction | `String` | `'left'` | left, right, top, bottom | The direction of the carousel. |
| indicator-trigger | `String` | `'click'` | click, hover | The trigger to activate the indicator. |
| indicator-type | `String` | `'line'` | line, disc | The style type of the indicator. |
| indicators | `Boolean` \| `String` | `true` | false, true, hover | Whether to show or how to show the indicators. |
| interval | `Number` | `5000` | - | The amount of time to delay between automatically cycling an item. |
| pauseOnEnter | `Boolean` | `true` | - | Indicates if pause the slides automatically when pointer entering. |
| slideOnSwipe | `Boolean` | `true` | - | Indicates if slide the slides automatically after swiped. |
| tag | `String` | `'div'` | - | The element tag of the carousel container. |

The array structure of `data`:

```js
[
  // Text
  'slide content',

  // HTML
  '<div>slide content</div>',

  // Vue component
  {
    template: '<div>slide content</div>',
  },

  /**
   * Render function which returns VNode.
   * @param {Function} createElement - The function for creating element.
   * @param {*} content - The current slide content.
   * @param {Vue} context - The current slide instance.
   */
  function render(createElement, content, context) {
    return createElement('div', ['slide content']);
  },

  // Object with `content` property
  {
    /**
     * The content of the slide.
     * Supports text, HTML, Vue component or render function which returns VNode.
     * @type {string|Object|Function}
     */
    content: 'slide content',

    // ...
  },
]
```

## Methods

| Name | Parameters | Description |
| --- | --- | --- |
| play | `()` | Play the carousel. Run automatically when the `autoplay` prop is set to `true`. |
| stop | `()` | Stop the carousel. |
| prev | `()` | Switch to the previous slide. |
| next | `()` | Switch to the next slide. |
| slideTo | `(index)` | Switch to the slide of the given index. |
