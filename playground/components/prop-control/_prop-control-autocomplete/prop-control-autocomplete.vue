<template>
	<transition-fade v-bem:values tag="div" group>
		<el-autocomplete
			v-bem:value
			key="in"
			:min="0"
			:step="50"
			:value="isSeparated ? value[0] : value"
			:fetch-suggestions="fetchSuggestions"
			@input="(v) => onChange(v, 'in')"
		/>
		<el-autocomplete
			v-if="isSeparated"
			v-bem:value
			key="out"
			:min="0"
			:step="50"
			:fetch-suggestions="fetchSuggestions"
			:value="value[1]"
			@input="(v) => onChange(v, 'out')"
		/>
	</transition-fade>
</template>

<script>
	import _prop from 'vue-types';

	export default {
		name: 'prop-control-autocomplete',
		block: 'prop-control',
		props: {
			isSeparated: _prop.bool.def(false),
			value: _prop.oneOfType([String, Array]),
			options: _prop.array,
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
			fetchSuggestions(query, cb) {
				return cb(this.options.map(value => ({ value })));
			},
		},
	};
</script>
