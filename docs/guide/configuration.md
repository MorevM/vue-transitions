# Plugin configuration

The named `plugin` export accepts shared defaults and per-component overrides. A component override wins over the
same option in `defaultProps`.

```ts
import { createApp } from 'vue';
import { plugin as vueTransitionsPlugin } from '@morev/vue-transitions';
import App from './app.vue';

createApp(App).use(
  vueTransitionsPlugin({
    defaultProps: {
      duration: 200,
      motion: 'system',
    },
    componentDefaultProps: {
      TransitionExpand: {
        duration: 500,
      },
      TransitionSlide: {
        offset: [0, -24],
      },
    },
  }),
);
```

`defaultProps` accepts [common props](/api/common-props). `componentDefaultProps` also accepts each component's
unique props.

::: warning
Plugin defaults are applied directly and are not checked by Vue's runtime prop validators. TypeScript catches most
invalid values, but JavaScript applications should keep the documented shapes and ranges.
:::

Props passed to a component instance still take precedence over plugin defaults:

```vue
<transition-expand :duration="800">
  <div v-if="isVisible">Content</div>
</transition-expand>
```
