<template>
	<transition-fade v-bem:values tag="div" group>
		<div v-bem:value="{ hasInner: true }" key="in">
			<el-input
				:value="isSeparated ? value[0][0] : value[0]"
				@input="(v) => onChange(v, 0, 'in')"
			/>
			<el-input
				:value="isSeparated ? value[0][1] : value[1]"
				@input="(v) => onChange(v, 1, 'in')"
			/>
		</div>
		<div v-if="isSeparated" v-bem:value="{ hasInner: true }" key="out">
			<el-input
				:value="value[1][0]"
				@input="(v) => onChange(v, 0, 'out')"
			/>
			<el-input
				:value="value[1][1]"
				@input="(v) => onChange(v, 1, 'out')"
			/>
		</div>
	</transition-fade>
</template>

<script>
	/* eslint-disable no-lonely-if */
	import _prop from 'vue-types';

	export default {
		name: 'prop-control-double-text',
		block: 'prop-control',
		props: {
			isSeparated: _prop.bool.def(false),
			value: _prop.array,
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
			onChange(value, index, mode) {
				if (!this.isSeparated) {
					value = value.includes('%') ? value : parseFloat(value);
					if (index === 0) {
						this.$emit('input', [value, this.value[1]]);
					} else {
						this.$emit('input', [this.value[0], value]);
					}
					return;
				}

				if (mode === 'in') {
					if (index === 0) {
						this.$emit('input', [[value, this.value[0][1]], this.value[1]]);
					} else {
						this.$emit('input', [[this.value[0][0], value], this.value[1]]);
					}
				} else {
					if (index === 0) {
						this.$emit('input', [this.value[0], [value, this.value[1][1]]]);
					} else {
						this.$emit('input', [this.value[0], [this.value[1][0], value]]);
					}
				}
			},
		},
	};
</script>
