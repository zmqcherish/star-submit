<template>
	<n-form-item
		:label="label"
		:path="path"
	>
		<n-input
			v-model:value="bindVal"
			:placeholder="placeHolder"
		/>
	</n-form-item>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { NInput, NFormItem } from "naive-ui";

export default defineComponent({
	components: {
		NInput,
		NFormItem,
	},
	props: {
		label: {
			type: String,
			required: true,
		},
		path: {
			type: String,
			required: false,
		},
		placeHolder: {
			type: String,
			default: "",
		},
		value: {
			type: String,
			required: false,
		},
	},
	setup(props, { emit }) {
		const bindVal = computed({
			// 自定义组件内部获取父组件传递的数据
			get: () => props.value,
			// 数据发生变化时同步修改父组件中的数据
			set: (val) => {
				emit("update:value", val);
			},
		});
		return {
			bindVal,
		};
	},
});
</script>
