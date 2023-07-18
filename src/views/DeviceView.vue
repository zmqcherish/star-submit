<template>
	<n-space vertical>
		<n-space justify="end"><n-button
				type="success"
				@click="openAddDialog()"
			>
				新增设备
			</n-button></n-space>

		<table-comp
			:data="devices"
			@del="delDevice"
		/>
	</n-space>

	<n-modal
		v-model:show="dialogShow"
		preset="dialog"
		title="新增设备"
		positive-text="确定"
		@positive-click="addDevice"
	>
		<n-space vertical>
			<n-select
				v-model:value="addType"
				:options="addTypes"
				@update:value="handleTypeChange"
			/>
			<n-input
				v-model:value="addValue"
				type="text"
				:placeholder="placeHolder"
			/>
		</n-space>
	</n-modal>
</template>

<script lang="ts">
import TableComp from "@/components/TableComp.vue";
import { ref, defineComponent, toRaw } from "vue";
import { uuid } from "@/utils/util";
import {
	NSpace,
	NButton,
	NModal,
	NInput,
	NSelect,
	SelectOption,
} from "naive-ui";

const addTypes = [
	{
		value: "camera",
		label: "相机",
	},
	{
		value: "lens",
		label: "镜头",
	},
	{
		value: "tele",
		label: "赤道仪",
	},
	{
		value: "other",
		label: "其它",
	},
];
const typeNames = {
	camera: "相机",
	lens: "镜头",
	tele: "赤道仪",
	other: "其它",
};
export default defineComponent({
	components: {
		TableComp,
		NSpace,
		NButton,
		NModal,
		NInput,
		NSelect,
	},
	setup() {
		let t1 = window.electronAPI.getData("devices") || [];
		let devices = ref(t1);
		// let aa = reactive([{a:1},{a:2},{a:3}]);
		let dialogShow = ref(false);
		let addValue = ref("");
		let addType = ref("camera");
		let placeHolder = ref("输入相机名称");

		const openAddDialog = () => {
			dialogShow.value = true;
		};

		// 创建一个过滤条件的 ref
		// const delCondition = ref('0');

		// 创建一个计算属性，用于对原始数组进行过滤
		// const filteredArray = computed(() => {
		// 	return devices.value.filter(item => item.id != delCondition.value);
		// });

		const addDevice = () => {
			if (!addValue.value) {
				return false;
			}
			let typeName = addType.value;
			let newItem = {
				id: typeName + "-" + uuid(),
				type: typeName,
				typeName: typeNames[typeName],
				label: addValue.value,
			};
			devices.value.push(newItem);
			window.electronAPI.setData("devices", devices.value.map(toRaw));
			addValue.value = "";
			dialogShow.value = false;
		};

		const delDevice = (delId) => {
			//这个方法有bug 暂未解决
			// console.log(aa);
			// aa = aa.filter(item => item.a != 10);
			// console.log(aa, toRaw(aa));

			devices.value = devices.value.filter(item => item.id != delId);

			// console.log(11, devices.value.map(toRaw), toRaw(devices.value));
			window.electronAPI.setData("devices", devices.value.map(toRaw));
		};

		const handleTypeChange = (value: string, option: SelectOption) => {
			// console.log(value);
			if(value == 'other') {
				placeHolder.value = '输入设备名称'
			} else {
				placeHolder.value = `输入${typeNames[value]}名称`
			}
		};

		return {
			dialogShow,
			addType,
			addValue,
			devices,
			addTypes,
			placeHolder,
			delDevice,
			openAddDialog,
			addDevice,
			handleTypeChange
		};
	},
});
</script>