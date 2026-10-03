<template>
	<section class="stagger-scenario" data-testid="stagger-scenario">
		<header class="stagger-scenario__header">
			<p class="stagger-scenario__eyebrow">TransitionExpand</p>
			<h1 class="stagger-scenario__title">Staggered list reflow</h1>
		</header>

		<div class="stagger-scenario__controls">
			<button type="button" :disabled="hasRemovedItems" @click="removeItems">Remove items 10–15</button>
			<button type="button" :disabled="!hasRemovedItems" @click="restoreItems">Restore items 10–15</button>
		</div>

		<div class="stagger-scenario__stage" data-testid="stagger-stage">
			<transition-expand
				class="stagger-scenario__list"
				tag="ul"
				easing="linear"
				group
				no-move
				:delay="{ enter: 100, leave: 150 }"
				:duration="400"
				:stagger="100"
			>
				<li
					v-for="item in items"
					:key="item"
					class="stagger-scenario__item"
					:data-testid="`stagger-item-${item}`"
				>
					Item {{ item }}
				</li>
			</transition-expand>
		</div>
	</section>
</template>

<script>
	import { TransitionExpand } from '@morev/vue-transitions';

	const ALL_ITEMS = Array.from({ length: 15 }, (_, index) => index + 1);

	export default {
		name: 'stagger-scenario',
		components: { TransitionExpand },
		data: () => ({ items: [...ALL_ITEMS] }),
		computed: {
			hasRemovedItems() {
				return this.items.length < ALL_ITEMS.length;
			},
		},
		methods: {
			removeItems() {
				this.items = this.items.filter((item) => item < 10 || item > 15);
			},

			restoreItems() {
				this.items = [...ALL_ITEMS];
			},
		},
	};
</script>

<style src="./stagger-scenario.css"></style>
