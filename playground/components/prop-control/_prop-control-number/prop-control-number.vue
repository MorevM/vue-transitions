<template>
	<transition-fade v-bem:values tag="div" group>
		<el-input-number
			v-bem:value
			key="in"
			:min="0"
			:step="50"
			:value="isSeparated ? value[0] : value"
			@change="(v) => onChange(v, 'in')"
		/>
		<el-input-number
			v-if="isSeparated"
			v-bem:value
			key="out"
			:min="0"
			:step="50"
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
			isSeparated: _prop.bool.def(false),
			value: _prop.oneOfType([Number, Array]),
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
				if (!this.isSeparated) return this.$emit('input', value);
				if (mode === 'in') {
					this.$emit('input', [value, this.value[1]]);
				} else {
					this.$emit('input', [this.value[0], value]);
				}
			},
		},
	};
</script>
