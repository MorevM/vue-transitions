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
			v-bind="cAttrs"
		/>

		<el-divider />
	</div>
</template>

<script>
	import _prop from 'vue-types';
	import PropControlNumber from './_prop-control-number/prop-control-number.vue';
	import PropControlAutocomplete from './_prop-control-autocomplete/prop-control-autocomplete.vue';
	import PropControlSelect from './_prop-control-select/prop-control-select.vue';
	import PropControlText from './_prop-control-text/prop-control-text.vue';
	import PropControlDoubleText from './_prop-control-double-text/prop-control-double-text.vue';

	export default {
		name: 'prop-control',
		components: {
			PropControlNumber,
			PropControlAutocomplete,
			PropControlSelect,
			PropControlText,
			PropControlDoubleText,
		},
		props: {
			label: _prop.string.isRequired,
			value: _prop.oneOfType([String, Number, Array]).isRequired,
			type: _prop.string.def('number'),
			min: _prop.number.def(0),
			max: _prop.number.def(undefined),
			step: _prop.number.def(50),
			options: _prop.array,
			single: _prop.bool.def(false),
			isSeparated: _prop.bool.def(false),
		},
		emits: ['input'],
		data: (vm) => ({}),
		computed: {
			modelValue: {
				get() { return this.value; },
				set(v) { this.$emit('input', v); },
			},

			cComponent() {
				switch (this.type) {
					case 'autocomplete':
						return 'prop-control-autocomplete';
					case 'select':
						return 'prop-control-select';
					case 'text':
						return 'prop-control-text';
					case 'double-text':
						return 'prop-control-double-text';
					default:
						return 'prop-control-number';
				}
			},

			cAttrs() {
				const { min, max, step } = this;
				const { options } = this;
				const { isSeparated } = this;

				return {
					min,
					max,
					step,
					options,
					isSeparated,
				};
			},
		},
	};
</script>

<style lang="scss" src="./prop-control.scss"></style>
