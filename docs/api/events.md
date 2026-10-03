# Lifecycle events

Transition components forward Vue's transition lifecycle. Use the events for state synchronization and cleanup,
not to implement the visual transition itself.

<events-demo />

```vue
<transition-fade
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
  @before-appear="onBeforeAppear"
  @appear="onAppear"
  @after-appear="onAfterAppear"
  @appear-cancelled="onAppearCancelled"
>
  <div v-if="isVisible">Content</div>
</transition-fade>
```

## Complete event list

| Phase              | Events                                                        |
| ------------------ | ------------------------------------------------------------- |
| Enter              | `before-enter`, `enter`, `after-enter`, `enter-cancelled`     |
| Leave              | `before-leave`, `leave`, `after-leave`, `leave-cancelled`     |
| Initial appearance | `before-appear`, `appear`, `after-appear`, `appear-cancelled` |

`leave-cancelled` is only available for `v-show` transitions, matching Vue's native behavior.

The four appearance events are emitted only when `appear` is enabled.

Every listener receives the animated `HTMLElement`. The `enter`, `leave`, and `appear` listener signatures also
include Vue's `done` callback. Events continue to fire when the [motion policy](/guide/accessibility) disables visual
animation.
