# List transitions

Set `group` to render Vue's `TransitionGroup` instead of `Transition`. Every child must have a stable key.

<transition-demo
  transition="fade"
  default-mode="group"
  :controls="['stagger', 'moveDuration', 'noMove']"
/>

Click **Clear** and then **Reset** to see the visual stagger. `moveDuration` controls position changes after add,
remove, or reorder operations; `noMove` keeps leaving items in normal flow.

```vue
<transition-fade group tag="ul" :move-duration="400">
  <li v-for="item in items" :key="item.id">
    {{ item.label }}
  </li>
</transition-fade>
```

## Group-only props

| Prop           | Default  | Purpose                                                                    |
| -------------- | -------- | -------------------------------------------------------------------------- |
| `tag`          | `'span'` | HTML tag rendered by `TransitionGroup`.                                    |
| `stagger`      | `0`      | Delay between children entering or leaving in the same update.             |
| `moveDuration` | `300`    | Duration in milliseconds for position changes.                             |
| `noMove`       | `false`  | Keeps leaving items in normal flow instead of positioning them absolutely. |

## Staggered transitions

Set `stagger` to delay each child after the previous child in the same update. The first child uses the regular
`delay`; each following child adds another `stagger` interval. It accepts either one value or separate `enter` and
`leave` values.

See [Staggered list transitions](/guide/staggered-lists) for examples, limitations, and layout trade-offs.
