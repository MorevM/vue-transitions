# Reduced motion

Every component uses the `motion` prop to decide whether a transition should animate.

<transition-demo transition="slide" :controls="['motion']" />

| Value      | Behavior                                                                               |
| ---------- | -------------------------------------------------------------------------------------- |
| `system`   | Disables animation when `prefers-reduced-motion: reduce` matches. This is the default. |
| `enabled`  | Always animates, regardless of the system preference.                                  |
| `disabled` | Completes transitions without animation or delay.                                      |

```vue
<transition-slide motion="system" :offset="[0, 24]">
  <div v-if="isVisible">Content</div>
</transition-slide>
```

Lifecycle events still fire when motion is disabled, so application behavior must not depend on visual animation.
The system preference is read once in the browser and refreshed on page reload. Changing an explicit `motion` prop
affects transitions started after that change.

Use `enabled` only when motion is essential to understanding the interface. Prefer `system` for ordinary decorative
movement.
