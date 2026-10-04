# Installation

Install the package with your preferred package manager.

::: code-group

```sh [pnpm]
pnpm add @morev/vue-transitions
```

```sh [npm]
npm install @morev/vue-transitions
```

```sh [yarn]
yarn add @morev/vue-transitions
```

```sh [bun]
bun add @morev/vue-transitions
```

:::

## Requirements

- Node.js 18.12 or newer.
- Vue 2.6.14 or newer, or Vue 3.
- Nuxt 2.17 or newer, or Nuxt 3.5 or newer, when using the Nuxt module.

The default package entrypoint targets Vue 3. Vue 2 applications must use the dedicated `/vue2` entrypoint.

| Application         | Entrypoint                                                |
| ------------------- | --------------------------------------------------------- |
| Vue 3               | `@morev/vue-transitions` or `@morev/vue-transitions/vue3` |
| Vue 2               | `@morev/vue-transitions/vue2`                             |
| Nuxt 2 or 3         | `@morev/vue-transitions/nuxt`                             |
| Explicit stylesheet | `@morev/vue-transitions/styles`                           |

Continue with [Usage](/guide/usage) to choose global registration or direct imports.
