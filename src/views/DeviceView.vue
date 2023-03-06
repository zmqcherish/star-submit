<template>
	<n-grid
		x-gap="10"
		:cols="2"
	>
		<n-gi>
			<n-space vertical>
				<n-space justify="end"><n-button
						type="success"
						@click="openAddDialog(1)"
					>
						新增相机
					</n-button></n-space>

				<table-comp
					:data="cameras"
					@del="delItem"
				></table-comp>
			</n-space>
		</n-gi>
		<n-gi>
			<n-space vertical>
				<n-space justify="end"><n-button type="success" @click="openAddDialog(2)">
						新增镜头
					</n-button></n-space>
				<table-comp :data="lens"></table-comp>
			</n-space>
		</n-gi>
	</n-grid>

	<n-modal v-model:show="dialogShow" preset="dialog" title="新增设备" positive-text="确定" @positive-click="addDevice">
		<div> <n-input v-model:value="addValue" type="text" :placeholder="addType == 1 ? '输入相机名称' : '输入镜头型号'" /></div>
	</n-modal>
</template>

<script lang="ts">
import TableComp from "@/components/TableComp.vue";
import { ref, defineComponent, toRaw } from "vue";
import { uuid } from "@/utils/util";
import { NSpace, NButton, NGrid, NGi, NModal,NInput } from "naive-ui";

export default defineComponent({
	components: {
		TableComp,
		NSpace,
		NButton,
		NGrid,
		NGi,NModal,NInput
	},
	setup() {
		let t1 = window.electronAPI.getData("camera");
		let t2 = window.electronAPI.getData("lens");
		let cameras = ref(t1);
		let lens = ref(t2);

		let dialogShow = ref(false);
		let addValue = ref("");
		let addType = ref(1); //1 是相机 2 是镜头

		const openAddDialog = (type) => {
			addType.value = type;
			dialogShow.value = true;
		};

		const addDevice = () => {
			if(!addValue.value) {
				return;
			}
			let newItem = { id: uuid(), title: addValue.value };
			if(addType.value == 1) {
				cameras.value.push(newItem);
				window.electronAPI.setData("camera", toRaw(cameras.value));
			} else {
				lens.value.push(newItem);
				window.electronAPI.setData("lens", toRaw(lens.value));
			}
			addValue.value = '';
			dialogShow.value = false;
		};

		const delItem = () => {
			console.log(11);
		};

		return {
			dialogShow,
			addType,
			addValue,
			cameras,
			lens,
			delItem,
			openAddDialog,
			addDevice
		};
	},
});
</script>