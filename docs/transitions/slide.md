# TransitionSlide

`TransitionSlide` offsets an element with `transform` while preserving its existing transform matrix. The demo card
starts with a small rotation; changing the offset does not remove it.

<transition-demo transition="slide" :controls="['offset', 'noOpacity']" />

```vue
<transition-slide :offset="[0, -24]">
  <div v-if="isVisible">Content</div>
</transition-slide>
```

## `offset`

The tuple contains horizontal and vertical offsets. Numbers are pixels; percentage strings are relative to the
element's own width or height. The default is `[0, -16]`.

```vue
<transition-slide :offset="['100%', 0]">
  <aside v-if="isOpen">Panel</aside>
</transition-slide>
```

Use an object for asymmetric movement:

```vue
<transition-slide
  :offset="{
    enter: [0, '-100%'],
    leave: [0, '100%'],
  }"
>
  <div v-if="isVisible">Content</div>
</transition-slide>
```

Add `no-opacity` for panels and drawers that should remain opaque throughout the movement.
