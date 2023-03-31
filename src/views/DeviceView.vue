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
		let t1 = window.electronAPI.getData("devices");
		let devices = ref(t1);

		let dialogShow = ref(false);
		let addValue = ref("");
		let addType = ref("camera");
		let placeHolder = ref("输入相机名称");

		const openAddDialog = () => {
			dialogShow.value = true;
		};

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
			window.electronAPI.setData("devices", toRaw(devices.value));
			addValue.value = "";
			dialogShow.value = false;
		};

		const delDevice = (delId) => {
			devices.value = devices.value.filter((item) => item.id != delId);
			window.electronAPI.setData("devices", toRaw(devices.value));
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