<template>
	<view class="cu-form-group">
		<view
			class="title"
			v-if="title"
		>{{ title }}</view>
		<!-- <input
			v-if="isNum"
			:placeholder="placeholder"
			v-model="value"
			type="number"
			@change="valChange"
		/> -->
		<input
			:placeholder="placeholder"
			v-model="newVal"
		/>
	</view>
</template>

<script>
export default {
	// data() {
	// 	return {
	// 		inputValue: "",
	// 	};
	// },
	props: {
		title: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
		val: {
			type: String,
			default: "",
		},
		isNum: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["update:val", ],
	computed: {
		newVal: {
			get: function () {
				return this.val;
			},
			set: function (value) {
				this.$emit("update:val", value);
			},
		}
	},
	methods: {
		
	},
};
</script>


<style>
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
</style>
