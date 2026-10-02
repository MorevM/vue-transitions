# TransitionCombined

`TransitionCombined` uses independently configured presets for enter and leave. Both descriptors are required.

<transition-demo transition="combined" :controls="['enterPreset', 'leavePreset', 'noOpacity']" />

```vue
<transition-combined
  :enter="{
    preset: 'scale',
    scale: 0.8,
    origin: '50% 50%',
  }"
  :leave="{
    preset: 'slide',
    offset: [0, '100%'],
  }"
>
  <div v-if="isVisible">Content</div>
</transition-combined>
```

## Preset descriptors

```ts
type TransitionPreset =
  | { preset: 'fade' }
  | { preset: 'expand'; axis?: 'x' | 'y' }
  | {
    preset: 'scale';
    axis?: 'x' | 'y' | 'both';
    origin?: string;
    scale?: number;
  }
  | {
    preset: 'slide';
    offset?: [number | string, number | string];
  };
```

Preset options inside a descriptor are single-phase values. Configure phase-specific timing with the common
`duration`, `delay`, and `easing` props:

```vue
<transition-combined
  :enter="{ preset: 'fade' }"
  :leave="{ preset: 'expand', axis: 'y' }"
  :duration="{ enter: 180, leave: 320 }"
>
  <div v-if="isVisible">Content</div>
</transition-combined>
```

The enter preset is also used for an initial `appear` transition.
