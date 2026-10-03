# Nuxt

The universal Nuxt module supports Nuxt 2.17+ and Nuxt 3.5+. It selects the matching Vue entrypoint, adds the shared
stylesheet, and makes every transition component available through Nuxt component auto-imports.

```ts
export default defineNuxtConfig({
  modules: [
    '@morev/vue-transitions/nuxt',
  ],
  vueTransitions: {
    defaultProps: {
      duration: 240,
      motion: 'system',
    },
    componentDefaultProps: {
      TransitionScale: {
        scale: 0.8,
      },
    },
  },
});
```

Use components without imports in pages and components:

```vue
<template>
  <transition-slide :offset="[0, 24]">
    <NotificationBanner v-if="message" />
  </transition-slide>
</template>
```

The `vueTransitions` configuration uses the same options as the [Vue plugin](/guide/configuration).
