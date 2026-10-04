# TransitionScale

`TransitionScale` animates one or both axes around a configurable transform origin. Existing transforms are preserved.

<transition-demo transition="scale" :controls="['axis', 'scale', 'origin', 'noOpacity']" />

```vue
<transition-scale :scale="0.8" origin="50% 0%">
  <div v-if="isVisible">Content</div>
</transition-scale>
```

## Unique props

| Prop     | Accepted values                        | Default     |
| -------- | -------------------------------------- | ----------- |
| `axis`   | `'x'`, `'y'`, or `'both'`              | `'both'`    |
| `scale`  | Number from `0` to `1`                 | `0`         |
| `origin` | Non-empty CSS `transform-origin` value | `'50% 50%'` |

Each prop can also receive complete enter and leave values:

```vue
<transition-scale
  :axis="{ enter: 'x', leave: 'y' }"
  :scale="{ enter: 0.8, leave: 0.4 }"
  :origin="{ enter: '0% 50%', leave: '100% 50%' }"
>
  <div v-if="isVisible">Content</div>
</transition-scale>
```
