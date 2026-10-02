# List transitions

Set `group` to render Vue's `TransitionGroup` instead of `Transition`. Every child must have a stable key.

<transition-demo
  transition="fade"
  default-mode="group"
  :controls="['moveDuration', 'noMove']"
/>

Click an item to remove it. `moveDuration` controls position changes after add, remove, or reorder operations;
`noMove` disables that part of the animation.

```vue
<transition-fade group tag="ul" :move-duration="400">
  <li v-for="item in items" :key="item.id">
    {{ item.label }}
  </li>
</transition-fade>
```

## Group-only props

| Prop           | Default  | Purpose                                                                     |
| -------------- | -------- | --------------------------------------------------------------------------- |
| `tag`          | `'span'` | HTML tag rendered by `TransitionGroup`.                                     |
| `moveDuration` | `300`    | Duration in milliseconds for position changes.                              |
| `noMove`       | `false`  | Disables position changes and avoids absolutely positioning a leaving item. |

`noMove` is useful for vertically stacked `TransitionExpand` items where the container itself should collapse
smoothly with the removed row.

```vue
<transition-expand group no-move tag="ul">
  <li v-for="item in items" :key="item.id">{{ item.label }}</li>
</transition-expand>
```
