<template>
	<n-data-table
		v-if="data"
		:columns="columns"
		:data="data"
		:bordered="false"
	>
		<template #empty>
			<n-result
		status="404"
		title="这里空空如也"
	>
	</n-result>
		</template></n-data-table>
	
</template>

<script lang="ts">
import { h, defineComponent } from "vue";
import { NButton, NResult, NDataTable } from "naive-ui";
import type { DataTableColumns } from "naive-ui";

const createColumns = ({opt}: {opt: (row) => void;}): DataTableColumns<any> => {
	return [
		{
			title: "设备名称",
			key: "label",
		},
		{
			title: "设备类型",
			key: "typeName",
		},
		{
			title: "",
			key: "actions",
			render(row) {
				return h(
					NButton,
					{
						strong: true,
						tertiary: true,
						size: "small",
						onClick: () => opt(row),
					},
					{ default: () => "删除" }
				);
			},
		},
	];
};


export default defineComponent({
	components: {
		NDataTable,
		NResult,
	},
	props: {
		data: {
			type: Array,
			default: () => {
				return [];
			},
		}
	},
	emits: ["del", ],
	setup(props, ctx) {
		const del = (row) => {
			ctx.emit("del", row.id);
		};

		return {
			columns: createColumns({opt:del}),
		};
	},
});
</script>