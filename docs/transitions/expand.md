# TransitionExpand

`TransitionExpand` animates the element's measured size, padding, and margins. It works well for disclosures,
accordions, and rows that should enter or leave the document flow smoothly.

<transition-demo transition="expand" :controls="['axis', 'noOpacity']" />

```vue
<transition-expand axis="y">
  <section v-if="isOpen">
    Content with an unknown natural height.
  </section>
</transition-expand>
```

## `axis`

Choose `y` for height or `x` for width. The default is `y`. Enter and leave may use different values:

```vue
<transition-expand :axis="{ enter: 'x', leave: 'y' }">
  <div v-if="isVisible">Content</div>
</transition-expand>
```

Opacity is animated alongside size by default. Add `no-opacity` when the size change should be the only visual effect.
