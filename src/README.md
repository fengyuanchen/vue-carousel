# Carousel

## Basic usage

```html
<template>
  <vue-carousel :data="data"></vue-carousel>
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
    <vue-feather type="radio"></vue-feather>
    <vue-carousel :data="data" :controls="false" :indicators="false" :interval="3000" direction="up"></vue-carousel>
  </div>
</template>

<script>
import { h, resolveComponent } from 'vue';
// import VueFeather from 'vue-feather';
// VueFeather has been registered as a global component.

export default {
  data() {
    return {
      data: [
        {
          id: 1,
          message: 'Rolling broadcast message',
        },
        {
          id: 2,
          message: 'Rolling broadcast message',
        },
        {
          id: 3,
          message: 'Rolling broadcast message',
        },
      ].map((item) => (function VueCarouselItem() {
        return h(
          'a',
          {
            href: '#',
            class: 'broadcast-content',
          },
          [
            h('span', [`${item.message} ${item.id}`]),
            h(resolveComponent('VueFeather'), {
              size: 16,
              type: 'chevron-right',
            }),
          ],
        );
      })),
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

.broadcast > .vue-feather {
  margin-right: 0.5rem;
}

.broadcast > .vue-carousel {
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
      <vue-carousel :data="data"></vue-carousel>
      <div class="text-center">Left (default)</div>
    </div>
    <div class="col-sm mt-3 mt-sm-0">
      <vue-carousel :data="data" direction="right"></vue-carousel>
      <div class="text-center">Right</div>
    </div>
    <div class="col-sm mt-3 mt-sm-0">
      <vue-carousel :data="data" direction="up"></vue-carousel>
      <div class="text-center">Up</div>
    </div>
    <div class="col-sm mt-3 mt-sm-0">
      <vue-carousel :data="data" direction="down"></vue-carousel>
      <div class="text-center">Down</div>
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

## Controls

### Without controls

```html
<template>
  <vue-carousel :data="data" :controls="false"></vue-carousel>
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
  <vue-carousel :data="data" :controls="true"></vue-carousel>
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
  <vue-carousel :data="data" :indicators="false"></vue-carousel>
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
  <vue-carousel :data="data" indicators="hover"></vue-carousel>
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
      <vue-carousel :data="data"></vue-carousel>
    </div>
    <div class="col-sm mt-3 mt-sm-0">
      <vue-carousel :data="data" indicator-trigger="hover"></vue-carousel>
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
      <vue-carousel :data="data"></vue-carousel>
    </div>
    <div class="col-sm mt-3 mt-sm-0">
      <vue-carousel :data="data" indicator-type="disc"></vue-carousel>
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
| autoplay | `boolean` | `true` | - | Indicates if play the slides automatically once mounted. |
| controls | `boolean \| string` | `"hover"` | false, true, hover | Whether to show or how to show the prev and next controls. |
| data | `Array` | - | - | The slides data of the carousel. It can be a list of templates or components. |
| direction | `string` | `"left"` | left, right, up, down | The sliding direction of the carousel. |
| indicator-trigger | `string` | `"click"` | click, hover | The trigger to activate the indicator. |
| indicator-type | `string` | `"line"` | line, disc | The style type of the indicator. |
| indicators | `boolean \| string` | `true` | false, true, hover | Whether to show or how to show the indicators. |
| interval | `number` | `5000` | - | The amount of time to delay between automatically cycling an item. |
| pauseOnEnter | `boolean` | `true` | - | Indicates if pause the slides automatically when pointer entering. |
| slideOnSwipe | `boolean` | `true` | - | Indicates if slide to the previous or next one after swiped. |
| tag | `string` | `"div"` | - | The element tag of the carousel container. |

## Methods

| Name | Parameters | Description |
| --- | --- | --- |
| play | `()` | Play the carousel. Run automatically when the `autoplay` prop is set to `true`. |
| stop | `()` | Stop the carousel. |
| prev | `()` | Switch to the previous slide. |
| next | `()` | Switch to the next slide. |
| slideTo | `(index)` | Switch to the slide of the given index. |

## Events

| Name | Parameters | Description |
| --- | --- | --- |
| slide | `(newIndex, oldIndex)` | Fires immediately when the slide transition starts. |
| slid | `(newIndex, oldIndex)` | Fired when slide transition has completed. |
