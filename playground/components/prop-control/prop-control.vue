<template>
	<div v-bem>
		<!-- Header -->
		<div v-bem:header>
			<div v-bem:label>{{ label }}</div>
		</div>

		<component
			:is="cComponent"
			v-bem:value
			v-model="modelValue"
			v-bind="{ isSeparated, options }"
		/>

		<el-divider />
	</div>
</template>

<script>
	import PropControlNumber from './_prop-control-number/prop-control-number.vue';
	import PropControlAutocomplete from './_prop-control-autocomplete/prop-control-autocomplete.vue';
	import PropControlSelect from './_prop-control-select/prop-control-select.vue';
	import PropControlText from './_prop-control-text/prop-control-text.vue';
	import PropControlDoubleText from './_prop-control-double-text/prop-control-double-text.vue';

	export default {
		name: 'prop-control',
		components: {
			PropControlNumber, PropControlAutocomplete, PropControlSelect, PropControlText, PropControlDoubleText,
		},
		props: {
			label: {
				type: String,
				required: true,
			},
			single: {
				type: Boolean,
				default: false,
			},
			value: {
				type: [String, Number, Array],
				required: true,
			},
			options: {
				type: Array,
				default: () => [],
			},
			type: {
				type: String,
				default: 'number',
			},
			isSeparated: {
				type: Boolean,
				default: false,
			},
		},
		emits: ['input'],
		data: (vm) => ({}),
		computed: {
			modelValue: {
				get() {
					return this.value;
				},
				set(v) {
					this.$emit('input', v);
				},
			},
			cComponent() {
				switch (this.type) {
					case 'autocomplete': return 'prop-control-autocomplete';
					case 'select': return 'prop-control-select';
					case 'text': return 'prop-control-text';
					case 'double-text': return 'prop-control-double-text';
					default: return 'prop-control-number';
				}
			},
		},
	};
</script>

<style lang="scss" src="./prop-control.scss"></style>
