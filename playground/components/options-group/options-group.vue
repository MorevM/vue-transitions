<template>
	<div v-bem>
		<div v-bem:label>{{ label }}</div>
		<div v-bem:controls>
			<div v-if="single" v-bem:control>
				<div v-bem:control-inputs>
					<slot></slot>
				</div>
			</div>
			<div v-if="!single" v-bem:control>
				<div v-bem:control-label>in:</div>
				<div v-bem:control-inputs>
					<slot name="in"></slot>
				</div>
			</div>
			<div v-if="!single" v-bem:control>
				<div v-bem:control-label>out:</div>
				<div v-bem:control-inputs>
					<slot name="out"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'options-group',
		components: {},
		props: {
			label: {
				type: String,
				required: true,
			},
			single: {
				type: Boolean,
				default: false,
			},
		},
		data: () => ({}),
		computed: {},
		watch: {},
		methods: {},
	};
</script>

<style lang="scss" src="./options-group.scss"></style>
