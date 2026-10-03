<template>
	<section class="staggered-list-demo">
		<label class="staggered-list-demo__field">
			<span class="staggered-list-demo__label">Filter people</span>
			<input
				v-model="query"
				class="staggered-list-demo__input"
				type="search"
				placeholder="Type a name"
			/>
		</label>

		<transition-expand
			class="staggered-list-demo__list"
			tag="ul"
			group
			no-move
			:duration="400"
			:stagger="100"
		>
			<li
				v-for="person in filteredPeople"
				:key="person"
				class="staggered-list-demo__item"
			>
				{{ person }}
			</li>
		</transition-expand>
	</section>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { TransitionExpand } from '../../../../src/index.js';

	const people = [
		'Bruce Lee',
		'Jackie Chan',
		'Chuck Norris',
		'Jet Li',
		'Kung Fury',
	];
	const query = ref('');
	const filteredPeople = computed(() => {
		const normalizedQuery = query.value.trim().toLowerCase();

		return people.filter((person) => person.toLowerCase().includes(normalizedQuery));
	});
</script>

<style lang="scss" src="./staggered-list-demo.scss"></style>
