<template>
	<section class="events-demo">
		<div class="events-demo__preview">
			<transition-fade
				:key="revision"
				appear
				:duration="350"
				@before-appear="record('before-appear')"
				@appear="record('appear')"
				@after-appear="record('after-appear')"
				@appear-cancelled="record('appear-cancelled')"
				@before-enter="record('before-enter')"
				@enter="record('enter')"
				@after-enter="record('after-enter')"
				@enter-cancelled="record('enter-cancelled')"
				@before-leave="record('before-leave')"
				@leave="record('leave')"
				@after-leave="record('after-leave')"
				@leave-cancelled="record('leave-cancelled')"
			>
				<div v-if="isVisible" class="events-demo__card">Lifecycle target</div>
			</transition-fade>
			<div class="events-demo__buttons">
				<button type="button" @click="isVisible = !isVisible">
					{{ isVisible ? 'Leave' : 'Enter' }}
				</button>
				<button type="button" @click="replayAppear">Replay appear</button>
			</div>
		</div>

		<ol class="events-demo__log" aria-live="polite">
			<li v-for="entry in entries" :key="entry.id">
				<code>{{ entry.name }}</code>
			</li>
			<li v-if="entries.length === 0" class="events-demo__empty">Events will appear here.</li>
		</ol>
	</section>
</template>

<script setup lang="ts">
	import { nextTick, ref } from 'vue';
	import { TransitionFade } from '../../../../src/index.js';

	const isVisible = ref(true);
	const revision = ref(0);
	const entryId = ref(0);
	const entries = ref<Array<{ id: number; name: string }>>([]);

	const record = (name: string) => {
		entryId.value += 1;
		entries.value = [...entries.value, { id: entryId.value, name }].slice(-12);
	};
	const replayAppear = async () => {
		isVisible.value = false;
		await nextTick();
		entries.value = [];
		isVisible.value = true;
		revision.value += 1;
	};
</script>

<style lang="scss" src="./events-demo.scss"></style>
