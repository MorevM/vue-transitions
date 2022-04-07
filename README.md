# @morev/vue-transitions

![Stability of "master" branch](https://img.shields.io/github/workflow/status/MorevM/vue-transitions/Build/master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Last commit](https://img.shields.io/github/last-commit/morevm/vue-transitions)
![Release version](https://img.shields.io/github/v/release/morevm/vue-transitions?include_prereleases)
![GitHub Release Date](https://img.shields.io/github/release-date/morevm/vue-transitions)
![Keywords](https://img.shields.io/github/package-json/keywords/morevm/vue-transitions)

> Vue 3 version coming soon

Reusable transitions for Vue 2 with no CSS needed ❤️.

Originally inspired by the [vue2-transitions](https://github.com/BinarCode/vue2-transitions)
it goes much further and provides more features with a simpler API.

✔️ Highly customizable via props \
✔️ Correctly works with grid/flex layouts in `group` mode \
✔️ Considers initial styles of animated elements such as `transform` or `opacity`

[DEMO / Playground](https://morevm.github.io/vue-transitions/)

## Table of contents:

* [Demo](https://morevm.github.io/vue-transitions/)
* [Installation](#installation)
  * [Using `yarn`](#using-yarn)
  * [Using `npm`](#using-npm)
  * [Using `pnpm`](#using-pnpm)
* [Usage](#usage)
  * [Global registration](#global-registration)
  * [Direct import of components](#direct-import-of-components)
* [List of transitions](#list-of-transitions)
  * [TransitionFade](#transitionfade)
  * [TransitionExpand](#transitionexpand)
  * [TransitionSlide](#transitionslide)
  * [TransitionScale](#transitionscale)
* [Props](#props)
  * [Common props](#common-props)
  * [Unique props of `TransitionExpand`](#unique-props-of-transitionexpand)
  * [Unique props of `TransitionSlide`](#unique-props-of-transitionslide)
  * [Unique props of `TransitionScale`](#unique-props-of-transitionscale)
* [Events](#events)

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

### Global registration

```js
import Vue from 'vue';
import VueTransitions from '@morev/vue-transitions';
import '@morev/vue-transitions/styles';

Vue.use(VueTransitions);
```

<details>
  <summary>😥 I got an error "This dependency was not found"</summary>

  For environments that can't resolve `exports` field (such as [Nuxt 2](https://nuxtjs.org/))
  just replace styles import with direct path to file:

  ```js
  import Vue from 'vue';
  import VueTransitions from '@morev/vue-transitions';
  import '@morev/vue-transitions/dist/index.css';

  Vue.use(VueTransitions);
  ```

</details>

---

### Direct import of components

```vue
<template>
  <transition-fade>
    <div v-if="isVisible" class="box">
      Fade transition
    </div>
  </transition-fade>
</template>

<script>
  import { TransitionFade } from '@morev/vue-transitions';

  export default {
    components: { TransitionFade },
  };
</script>
```

## List of transitions

### TransitionFade

Basic transition that changes element `opacity`. Pretty simple.

<details>
  <summary>Show code</summary>

  ```vue
  <template>
    <transition-fade>
      <div v-if="isVisible">...</div>
    </transition-fade>
  </template>

  <script>
    import { TransitionFade } from '@morev/vue-transitions';

    export default {
      components: { TransitionFade },
    };
  </script>
  ```

</details>

---

### TransitionExpand

Transition that manipulates with actual element size. \
If you are old enough you may know this transition as jQuery [`slideUp/slideDown`](https://api.jquery.com/slideup/). \
It also can work with `X` axis like `slideLeft` and `slideRight`
(although it's hard for me to come up with a scenario where it will really be needed).

Has [unique prop](#unique-props-of-transitionexpand): `axis`

---

### TransitionSlide

Transition that manipulates with element position via `transform: translate()`. \
It requires `offset` prop to calculate desired element position and can work with percentage values.

<details>
  <summary>Examples how to work with <code>offset</code> prop</summary>

  ```vue
  <template>
    <!--
      Element will fade in and fade out to top.
      Initial transform is `transform: translate(0, -16px)`
    -->
    <transition-slide :offset="[0, -16]"></transition-slide>

    <!--
      Element will fade in and fade out to bottom left side.
      Initial transform is `transform: translate(-16px, 16px)`
    -->
    <transition-slide :offset="[-16, 16]"></transition-slide>

    <!--
      Element will fade in and fade out to right,
      and the offset will be relative to the element width itself.
      Initial transform is `transform: translate(100%, 0)`
    -->
    <transition-slide :offset="['100%', 0]"></transition-slide>

    <!--
      Element will fade in from top and fade out to bottom,
      and the offset will be relative to the element height itself.

      Transform before element appears: `transform: translate(0, -100%)`
      Transform when element disappears: `transform: translate(0, 100%)`
    -->
    <transition-slide
      :offset="{
        enter: [0, '-100%'],
        leave: [0, '100%']
      }"
    ></transition-slide>
  </template>
  ```

</details>

It respects the transform applied to element itself via CSS and merges it with defined offset. \
It's very useful, for example, when you are trying to make centered dropdown.

<details>
  <summary>👀 Show example of `transform` merging</summary>

  ```vue
  <template>
    <div class="block">
      <!--
        In this case, given the CSS styles,
        initial transform will be calculated to `translate(-50%, -16px)`
      -->
      <transition-slide :offset="[0, -16]">
        <div class="block__dropdown" v-if="isVisible">
          ...
        </div>
      </transition-slide>
    </div>
  </template>

  <style>
    .block {
      position: relative;
    }

    .block__dropdown {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  </style>
  ```

</details>

Has [unique prop](#unique-props-of-transitionslide): `offset`

---

### TransitionScale

Transition that manipulates with element `transform: scale()`. \
By default, it scales element from `scale(1)` to `scale(0)`, but this behavior can be customized via `:scale` prop. \
It works with different axis via [axis](#unique-props-of-transitionscale) prop.

Has [unique props](#unique-props-of-transitionscale): `scale`, `axis`, `origin`

<details>
  <summary>Show example of code</summary>

  ```vue
  <template>
    <!--
      This element appears in `x` axis and disappears in `y`
    -->
    <transition-scale :axis="{ enter: 'x', leave: 'y' }"></transition-scale>

    <!--
      This element behaves like the `transition-expand`,
      but touches only `transform` property
    -->
    <transition-scale transform-origin="50% 0%"></transition-scale>

    <!--
      This element scales just a little when fading in/out.
    -->
    <transition-scale :scale=".8"></transition-scale>

  </template>
  ```

</details>

## Props

### Common props

Those properties are related to each transition:

<details>
  <summary><code>group</code></summary>
  <br />

  Whether the component should be a [`transition-group`](https://v2.vuejs.org/v2/guide/transitions.html#List-Transitions) component.

  ```ts
  export type TransitionGroup = boolean; // Default: false
  ```

  **Example:**

  ```vue
  <template>
    <div>
      <!--
        To animate a list of items, use `group` prop.
        ⚠️ Don't forget you should pass the `:key` to each item in this case.
      -->
      <transition-fade group>
        <div v-for="item in items" :key="item.id">...</div>
      </transition-fade>
    </div>
  </template>
  ```

</details>

<details>
  <summary><code>tag</code></summary>
  <br />

  Transition tag, in the case of using a [`transition-group`](https://v2.vuejs.org/v2/guide/transitions.html#List-Transitions) component.

  ```ts
  export type TransitionTag = string; // Default: 'span'
  ```

  **Example:**

  ```vue
  <template>
    <div>
      <!--
        Passing the tag renders transition component with it.
        It's suitable, for example, for rendering semantic lists:
      -->
      <transition-fade group tag="ul">
        <li v-for="item in items" :key="item.id">...</li>
      </transition-fade>

      <!-- ✨ Rendered HTML: -->
      <ul>
        <li>...</li>
        <li>...</li>
      </ul>
    </div>
  </template>
  ```

</details>

<details>
  <summary><code>appear</code></summary>
  <br />

  Whether to apply a transition on the initial render of a node.
  Acts literally the same as original
  [Vue transition appear prop](https://v2.vuejs.org/v2/guide/transitions.html?redirect=true#Transitions-on-Initial-Render)

  ```ts
  export type TransitionAppear = boolean; // Default: undefined
  ```

  **Example:**

  ```vue
  <template>
    <div>
      <!--
        This element appears when mounted if `isVisible` is `true` by default.
      -->
      <transition-fade appear>
        <div v-if="isVisible">...</div>
      </transition-fade>
    </div>
  </template>
  ```

</details>

<details>
  <summary><code>mode</code></summary>
  <br />

  [Transition mode](https://v2.vuejs.org/v2/guide/transitions.html?redirect=true#Transition-Modes).

  ```ts
  export type TransitionMode = 'in-out' | 'out-in' | undefined; // Default: undefined
  ```

  **Example:**

  ```vue
  <template>
    <div>
      <!--
        Current element transitions out first, then when complete,
        the new element transitions in.
      -->
      <transition-slide mode="out-in">
        <component :is="currentComponent">...</component>
      </transition-slide>
    </div>
  </template>
  ```

</details>

<details>
  <summary><code>duration</code></summary>
  <br />

  Transition animation duration, ms. \
  If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

  ```ts
  // Default: 300
  export type TransitionDuration = number | { enter: number, leave: number }
  ```

  **Example:**

  ```vue
  <template>
    <div>
      <!--
        If single value provided, the passed amount of milliseconds
        applied to enter and leave animations both.
        This element will appear and disappear within 500ms:
      -->
      <transition-fade :duration="500">
        <div v-if="isVisible">...</div>
      </transition-fade>

      <!--
        If an object given, it SHOULD have `enter` and `leave` keys.
        This element appears in 200ms and disappears within 500ms:
      -->
      <transition-fade :duration="{ enter: 200, leave: 500 }">
        <div v-if="isVisible">...</div>
      </transition-fade>
    </div>
  </template>
  ```

</details>

<details>
  <summary><code>move-duration</code></summary>
  <br />

  Duration of animation of elements positions changing, in the case of using a `transition-group`.

  Although Vue does not have a native way to set the duration of the move animation via props, this task can be done using
  [CSS Custom Properties](https://css-tricks.com/a-complete-guide-to-custom-properties/).

  <details>
    <summary>👀 Show explanation</summary>

    ```html
    <!-- This way it can be set dynamically -->
    <div style="--move-duration: 300ms;">
      <div class="scale-move"></div>
      <div class="scale-move"></div>
    </div>
    ```

    ```css
    .scale-move {
      transition-duration: var(--move-duration, 300ms);
    }
    ```

  </details>

  ```ts
  // Default: 300
  export type TransitionMoveDuration = number | { enter: number, leave: number }
  ```

</details>

<details>
  <summary><code>delay</code></summary>
  <br />

  Transition animation delay, ms.\
  If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

  ```ts
  // Default: 300
  export type TransitionDelay = number | { enter: number, leave: number };
  ```

  **Example:**

  ```vue
  <template>
    <div>
      <!--
        If single value provided, then enter and leave animations will wait
        for given amount of milliseconds before run.
        This element will appear and disappear 100ms after
        `isVisible` property changes:
      -->
      <transition-fade :delay="100">
        <div v-if="isVisible">...</div>
      </transition-fade>

      <!--
        If an object given, it SHOULD have `enter` and `leave` keys.
        This element appears immediately and disappears 200ms after
        `isVisible` property changes:
      -->
      <transition-fade :duration="{ enter: 0, leave: 300 }">
        <div v-if="isVisible">...</div>
      </transition-fade>
    </div>
  </template>
  ```

</details>

<details>
  <summary><code>easing</code></summary>
  <br />

  Transition animation easing. Should be a valid CSS transition timing function. \
  If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

  ```ts
  export type TransitionEasing = string; // Default: 'ease-in-out'
  ```

  **Example:**

  ```vue
  <template>
    <div>
      <!--
        If single value provided, then enter and leave animations will use it:
      -->
      <transition-fade easing="ease-out">
        <div v-if="isVisible">...</div>
      </transition-fade>

      <!--
        If an object given, it SHOULD have `enter` and `leave` keys.
        This element uses custom animation known as `bounce-in` for entering
        and simple `ease-out` curve for leaving:
      -->
      <transition-fade
        :easing="{
          enter: 'cubic-bezier(0.6, 0, 0.4, 2)',
          leave: 'ease-out'
        }"
      >
        <div v-if="isVisible">...</div>
      </transition-fade>
    </div>
  </template>
  ```

</details>

<details>
  <summary><code>no-opacity</code></summary>
  <br />

  Whether to **not** animate the element `opacity`.

  By default, each transition manipulates `opacity` in addition to the main property. \
  However, sometimes this is not required - for example, when implementing modal panels that appear from the edge of the screen.

  > The prop is obviously not applicable to `transition-fade` component.


  ```ts
  export type TransitionNoOpacity = boolean; // Default: false
  ```

  **Example:**

  ```vue
  <template>
    <div>
      <!--
        This panel appears from the right edge of the screen,
        while its transparency remains unchanged.
      -->
      <transition-slide :offset="['100%', 0]" no-opacity>
        <div class="panel" v-if="isVisible">...</div>
      </transition-slide>
    </div>
  </template>

  <style>
    .panel {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      background: #ffffff;
      width: 400px;
    }
  </style>
  ```

</details>

<details>
  <summary><code>no-move</code></summary>
  <br />

  Whether to **not** animate elements positions changing, in the case of using a `transition-group`.

  By default, when using `group` mode, when an element is removed, the remaining elements smoothly change their position. \
  They are given absolute positioning and dropped out of the flow, so the parent container collapses in height.

  Usually this is not a problem, but sometimes - for example, when using `transition-expand` and
  sequentially placed elements under each other, it looks rough. \
  With this option, you can achieve a more pleasant behavior of the elements in this situation.

  ```ts
  export type TransitionNoMove = boolean; // Default: false
  ```

  **Example:**

  ```vue
  <template>
    <div>
      <!--
        In this case, the height of the parent element (`ul`) changes smoothly.
      -->
      <transition-expand group no-move tag="ul">
        <li v-for="item in items" :key="item.id">...</li>
      </transition-expand>
    </div>
  </template>
  ```

</details>

---

### Unique props of `TransitionExpand`

<details>
  <summary><code>axis</code></summary>
  <br />

  Axis by which the element should expand. \
  If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

  ```ts
  type ExpandAxisValue = 'x' | 'y'; // Default: 'y'
  export type TransitionExpandAxis = ExpandAxisValue | { enter: ExpandAxisValue, leave: ExpandAxisValue }
  ```

</details>

---

### Unique props of `TransitionSlide`

<details>
  <summary><code>offset</code></summary>
  <br />

  The element offset by `x` and `y` axis before/after the transition. \
  Should be an integer or a string representation of percentage value (e.g. `'100%'`).

  Number values treats as `px` offset, string values ending with `%` sign treats as `percentage of the element width / height`. \
  [Examples and explanation](#transitionslide)

  If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

  ```ts
  type SlideOffsetValue = [number | string, number | string];

  // Default: [0, -16]
  export type TransitionSlideOffset = SlideOffsetValue | { enter: SlideOffsetValue, leave: SlideOffsetValue }
  ```

</details>

---

### Unique props of `TransitionScale`

<details>
  <summary><code>axis</code></summary>
  <br />

  Scale axis to be animated.

    * `both` (uses `transform: scale()`)
    * `x` (uses `transform: scaleX()`)
    * `y` (uses `transform: scaleY()`)

  [Examples and explanation](#transitionscale)

  If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

  ```ts
  type ScaleAxisValue = 'x' | 'y' | 'both';

  // Default: 'both'
  export type TransitionScaleAxis = ScaleAxisValue | { enter: ScaleAxisValue, leave: ScaleAxisValue }
  ```

</details>

<details>
  <summary><code>origin</code></summary>
  <br />

  `transform-origin` CSS property applied to element(s). \

  If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

  [Examples and explanation](#transitionscale)

  If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

  ```ts
  // Default: '50% 50%'
  export type TransitionScaleAxis = string | { enter: string, leave: string }
  ```

</details>

<details>
  <summary><code>scale</code></summary>
  <br />

  The element scale value before/after the transition. Should be a number between `0` and `1`.

  If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

  [Examples and explanation](#transitionscale)

  If an object given then `enter` and `leave` values will be used for enter and leave transition respectively.

  ```ts
  // Default: 0
  export type TransitionScaleScale = number | { enter: number, leave: number }
  ```

</details>

---

## Events

Components do not provide any special events,
but trigger [all standard transition events](https://ru.vuejs.org/v2/guide/transitions.html#JavaScript-%D1%85%D1%83%D0%BA%D0%B8):

* `before-enter`
* `enter`
* `after-enter`
* `enter-cancelled`
* `before-leave`
* `leave`
* `after-leave`
* `enter-leave`
