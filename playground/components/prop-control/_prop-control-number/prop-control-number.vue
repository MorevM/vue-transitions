<template>
	<transition-fade v-bem:values tag="div" group>
		<el-input-number
			v-bem:value
			key="in"
			:min="min"
			:max="max"
			:step="step"
			:value="isSeparated ? value[0] : value"
			@change="(v) => onChange(v, 'in')"
		/>
		<el-input-number
			v-if="isSeparated"
			v-bem:value
			key="out"
			:min="0"
			:step="step"
			:value="value[1]"
			@change="(v) => onChange(v, 'out')"
		/>
	</transition-fade>
</template>

<script>
	import _prop from 'vue-types';

	export default {
		name: 'prop-control-number',
		block: 'prop-control',
		props: {
			value: _prop.oneOfType([Number, Array]),
			min: _prop.number.def(0),
			max: _prop.number.def(undefined),
			step: _prop.number.def(50),
			isSeparated: _prop.bool.def(false),
		},
		emits: ['input'],
		watch: {
			isSeparated(isActive) {
				if (isActive) {
					this.$emit('input', [this.value, this.value]);
				} else {
					this.$emit('input', this.value[0]);
				}
			},
		},
		methods: {
			onChange(value, mode) {
				if (!this.isSeparated) {
					return this.$emit('input', value);
				}

				if (mode === 'in') {
					this.$emit('input', [value, this.value[1]]);
				} else {
					this.$emit('input', [this.value[0], value]);
				}
			},
		},
	};
</script>
