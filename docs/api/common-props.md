# Common props

All five transition components accept these props. Component-specific props are documented on each
[transition page](/transitions/fade).

## Timing

<transition-demo transition="slide" :controls="['duration', 'delay', 'easing']" />

`duration`, `delay`, and `easing` accept either one value for both phases or an object with complete `enter` and
`leave` values.

```vue
<transition-slide
  :duration="{ enter: 180, leave: 320 }"
  :delay="{ enter: 0, leave: 100 }"
  :easing="{ enter: 'ease-out', leave: 'ease-in' }"
>
  <div v-if="isVisible">Content</div>
</transition-slide>
```

| Prop       | Type                                         | Default                          |
| ---------- | -------------------------------------------- | -------------------------------- |
| `duration` | `number \| { enter: number; leave: number }` | `300`                            |
| `delay`    | `number \| { enter: number; leave: number }` | `0`                              |
| `easing`   | `string \| { enter: string; leave: string }` | `'cubic-bezier(.25, .8, .5, 1)'` |

Durations and delays are integer milliseconds. Easing values must be non-empty CSS transition timing functions.

## Vue transition behavior

| Prop     | Type                   | Default     | Purpose                                      |
| -------- | ---------------------- | ----------- | -------------------------------------------- |
| `appear` | `boolean`              | `false`     | Animate an initially rendered child.         |
| `mode`   | `'in-out' \| 'out-in'` | `undefined` | Sequence old and new single children.        |
| `group`  | `boolean`              | `false`     | Render `TransitionGroup` for keyed children. |
| `tag`    | `string`               | `'span'`    | Tag rendered in group mode.                  |

```vue
<transition-fade appear mode="out-in">
  <component :is="currentView" :key="currentView" />
</transition-fade>
```

## Visual behavior

| Prop           | Type                                  | Default    | Purpose                                                            |
| -------------- | ------------------------------------- | ---------- | ------------------------------------------------------------------ |
| `motion`       | `'system' \| 'enabled' \| 'disabled'` | `'system'` | Apply the [motion policy](/guide/accessibility).                   |
| `noOpacity`    | `boolean`                             | `false`    | Keep opacity unchanged for supported presets in `TransitionMixed`. |
| `moveDuration` | `number`                              | `300`      | Set list position-change duration in milliseconds.                 |
| `noMove`       | `boolean`                             | `false`    | Disable list position changes.                                     |

See [List transitions](/guide/lists) for the group-only behavior.
