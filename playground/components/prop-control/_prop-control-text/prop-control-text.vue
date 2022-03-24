<template>
	<transition-fade v-bem:values tag="div" group>
		<el-input
			v-bem:value
			key="in"
			:value="isSeparated ? value[0] : value"
			@input="(v) => onChange(v, 'in')"
		/>
		<el-input
			v-if="isSeparated"
			v-bem:value
			key="out"
			:value="value[1]"
			@input="(v) => onChange(v, 'out')"
		/>
	</transition-fade>
</template>

<script>
	import _prop from 'vue-types';

	export default {
		name: 'prop-control-text',
		block: 'prop-control',
		props: {
			value: _prop.oneOfType([String, Array]),
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
