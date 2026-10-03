# TransitionFade

`TransitionFade` animates only the element's opacity. It is the smallest component and a good default when movement
would distract from the content change.

<transition-demo transition="fade" />

```vue
<transition-fade :duration="250">
  <div v-if="isVisible">Saved successfully</div>
</transition-fade>
```

The component has no unique props. Use [common props](/api/common-props) for timing, initial appearance, transition
mode, reduced-motion behavior, and groups.

::: tip
`noOpacity` has no effect here because opacity is the transition's only animated property.
:::
