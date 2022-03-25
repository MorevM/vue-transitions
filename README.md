# @morev/vue-transitions

![Stability of "master" branch](https://img.shields.io/github/workflow/status/MorevM/vue-transitions/Build/master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Last commit](https://img.shields.io/github/last-commit/morevm/vue-transitions)
![Release version](https://img.shields.io/github/v/release/morevm/vue-transitions?include_prereleases)
![GitHub Release Date](https://img.shields.io/github/release-date/morevm/vue-transitions)
![Keywords](https://img.shields.io/github/package-json/keywords/morevm/vue-transitions)

> Playground and documentation coming soon

Reusable transitions for Vue 2.

## Installation

### Using `yarn`

```bash
yarn add @morev/vue-transitions
```

### Using `npm`

```bash
npm install @morev/vue-transitions
```

### Using `pnpm`

```bash
pnpm add @morev/vue-transitions
```

## Usage

```vue
<template>
  <fade-transition>
    <div v-if="isVisible" class="box">
      <p>Fade transition</p>
    </div>
  </fade-transition>
</template>

<script>
  import { FadeTransition } from '@morev/vue-transitions';

  export default {
    components: { FadeTransition },
  };
  </script>
```

Global usage:

```js
import MoreVueTransitions from '@morev/vue-transitions';
import '@morev/vue-transitions/styles';

Vue.use(MoreVueTransitions);
```

## List of transitions

* TransitionFade
* TransitionExpand
* TransitionSlide
* TransitionScale

## Props

### duration

```ts
{
  duration: number;
  duration: {enter: number, leave: number};
}
```

Transition animation duration, ms.\
If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

Default: `300`.

### easing

```ts
{
  easing: string;
  easing: {enter: string, leave: string};
}
```

Transition animation easing. Should be a valid CSS transition timing function.\
If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

Default: `ease-in-out`.

### delay

```ts
{
  delay: number;
  delay: {enter: number, leave: number};
}
```

Transition animation delay, ms.\
If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

Default: `0`.

### opacity

```ts
{
  noOpacity: boolean;
}
```

Whether to not animate the element opacity.\
Does not affects the `transition-fade` transition.

Default: `false`.

### offset `(TransitionSlide)`

```ts
{
  offset: [number|string, number|string];
  offset: {enter: [number|string, number|string], leave: [number|string, number|string]};
}
```

The element offset by x and y axis before/after the transition. Should be an integer or a string representation of percentage value (e.g. `'100%'`).\
If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

Default: `[0, -16]`.

### axis `(TransitionExpand)`

```ts
{
  axis: 'x'|'y';
  axis: {enter: 'x'|'y', leave: 'x'|'y'};
}
```

Axis by which the element should be expand.\
If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

Default: `y`.

### axis `(TransitionScale)`

```ts
{
  axis: 'x'|'y'|'both';
  axis: {enter: 'x'|'y'|'both', leave: 'x'|'y'|'both'};
}
```

Scale axis to be animated.\
If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

Default: `both`.

### origin `(TransitionScale)`

```ts
{
  origin: string;
  origin: {enter: string, leave: string};
}
```

Transform origin property. \
If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

Default: `50% 50%`.

### scale `(TransitionScale)`

```ts
{
  scale: number;
  scale: {enter: number, leave: number};
}
```

The element scale value before/after the transition. Should be an number between `0` and `1`.\
If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

Default: `0`.

### appear

```ts
{
  appear: boolean;
}
```

Whether to apply a transition on the initial render of a node.

Default: `false`.

### mode

```ts
{
  mode: 'out-in'|'in-out'|undefined;
}
```

[Transition mode](https://v2.vuejs.org/v2/guide/transitions.html?redirect=true#Transition-Modes).

Default: `undefined`.

### group

```ts
{
  group: boolean;
}
```

Whether the component should be a [`transition-group`](https://v2.vuejs.org/v2/guide/transitions.html?redirect=true#List-Transitions) component.

Default: `false`.

### tag

```ts
{
  tag: string;
}
```

Transition tag, in the case of using a `transition-group`.

Default: `span`.

### moveDuration

```ts
{
  moveDuration: number;
}
```

Duration of animation of elements positions changing, in the case of using a `transition-group`.

Default: `300`.

### moveDisable

```ts
{
  moveDisable: boolean;
}
```

Whether to not animate elements positions changing, in the case of using a `transition-group`.

Default: `false`.
