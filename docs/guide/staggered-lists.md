# Staggered list transitions

Use `stagger` to offset the start of each child transition in a group.

## Sequential reflow

`TransitionExpand` can create a staggered vertical reflow because it animates each row's dimensions. Add `no-move` to
keep leaving rows in normal flow until their own transitions finish.

<staggered-list-demo />

```vue
<transition-expand
  group
  no-move
  tag="ul"
  :stagger="100"
>
  <li v-for="item in filteredItems" :key="item.id">
    {{ item.label }}
  </li>
</transition-expand>
```

`stagger` delays animation starts, so adjacent rows can still animate at the same time.

## Why this is the practical case

Fade, slide, and scale only change appearance. With Vue's move transition, leaving items exit normal flow together so
Vue can calculate the final layout once. Their stagger is therefore visual; keeping them in flow merely postpones the
layout change until each DOM node is removed.

Expand animates the dimensions themselves, so surrounding rows move through normal layout reflow without a separate
move transition. This makes flow-preserving staggered removal practical with `TransitionExpand`, or with an `expand`
leave preset in `TransitionMixed`.

Animating dimensions requires layout recalculation, but is reasonable for short vertical lists. This library wraps
Vue's `Transition` and `TransitionGroup`; supporting arbitrary layouts while combining staggered reflow with continuous
move animations would require a dedicated motion engine with its own layout measurements, sequencing, retargeting, and
cancellation logic.
