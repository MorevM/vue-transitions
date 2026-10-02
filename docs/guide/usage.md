# Usage

Use the plugin when transition components are common throughout an application. Import individual components when
you prefer local registration and explicit dependencies.

## Global registration

::: code-group

```ts{2,7-9} [Vue 3]
import { createApp } from 'vue';
import { plugin as vueTransitionsPlugin } from '@morev/vue-transitions';
import App from './app.vue';

const app = createApp(App);

app.use(
  vueTransitionsPlugin(),
);
app.mount('#app');
```

```js{2,5} [Vue 2]
import Vue from 'vue';
import { plugin as vueTransitionsPlugin } from '@morev/vue-transitions/vue2';
import App from './app.vue';

Vue.use(vueTransitionsPlugin());

new Vue({
  render: (createElement) => createElement(App),
}).$mount('#app');
```

:::

All five components become available globally: `TransitionFade`, `TransitionExpand`, `TransitionSlide`,
`TransitionScale`, and `TransitionMixed`.

## Direct imports

```vue
<template>
  <transition-fade>
    <div v-if="isVisible">Content</div>
  </transition-fade>
</template>

<script setup>
  import { ref } from 'vue';
  import { TransitionFade } from '@morev/vue-transitions';

  const isVisible = ref(true);
</script>
```

Import from `@morev/vue-transitions/vue2` in a Vue 2 application.

## Styles

Styles are included automatically with the plugin and component entrypoints. If a build tool does not follow CSS
imports from a library, include the shared stylesheet once in the application entrypoint:

```ts
import '@morev/vue-transitions/styles';
```

Next, choose a [transition component](/transitions/fade), configure [plugin defaults](/guide/configuration), or set up
the [Nuxt module](/guide/nuxt).
