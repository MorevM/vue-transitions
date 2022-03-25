<template>
	<transition-fade v-bem:values tag="div" group>
		<el-select
			v-bem:value
			key="in"
			:value="isSeparated ? value[0] : value"
			@change="(v) => onChange(v, 'in')"
		>
			<el-option
				v-for="item in cOptions"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			/>
		</el-select>
		<!-- Out -->
		<el-select
			v-if="isSeparated"
			v-bem:value
			key="out"
			:value="value[1]"
			@change="(v) => onChange(v, 'out')"
		>
			<el-option
				v-for="item in cOptions"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			/>
		</el-select>
	</transition-fade>
</template>

<script>
	import _prop from 'vue-types';

	export default {
		name: 'prop-control-select',
		block: 'prop-control',
		props: {
			isSeparated: _prop.bool.def(false),
			value: _prop.oneOfType([String, Array]),
			options: _prop.array,
		},
		emits: ['input'],
		computed: {
			cOptions() {
				return this.options.map(o => ({ label: o, value: o }));
			},
		},
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
			fetchSuggestions(query, cb) {
				return cb(this.options.map(value => ({ value })));
			},
		},
	};
</script>
