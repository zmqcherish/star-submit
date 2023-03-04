<template>
	<n-config-provider :theme="darkTheme">
		<n-space vertical>
			<n-layout
				has-sider
				style="height: 560px;"
				bordered
			>
				<n-layout-sider
					bordered
					collapse-mode="width"
					:collapsed-width="64"
					:width="240"
					:collapsed="collapsed"
				>
					<n-menu
						:collapsed="collapsed"
						:collapsed-width="64"
						:collapsed-icon-size="22"
						:options="menuOptions"
						:on-update:value="menuChange"
					/>
				</n-layout-sider>
				<n-layout v-if="menuKey == 'main'">
					<span>欢迎</span>
				</n-layout>
				<n-layout v-if="menuKey == 'device'" style="margin: 20px 10px">
					<n-grid
						x-gap="10"
						:cols="2"
					>
						<n-gi>
							<n-space vertical>
								<n-space justify="end"><n-button type="success">
									新增相机
								</n-button></n-space>


								<table-comp :data="cameras" @del="testdel"></table-comp>
							</n-space>
						</n-gi>
						<n-gi>
							<n-space vertical>
								<n-space justify="end"><n-button type="success">
									新增镜头
								</n-button></n-space>
								<table-comp></table-comp>
							</n-space>
						</n-gi>
					</n-grid>

				</n-layout>
				<n-layout v-if="menuKey == 'setting'">
					<span>设置</span>
				</n-layout>
			</n-layout>
		</n-space>
	</n-config-provider>
</template>

<script lang="ts">
import TableComp from "@/components/TableComp.vue";
import { h, ref, defineComponent, Component } from "vue";
import {
	darkTheme,
	NConfigProvider,
	NIcon,
	NLayout,
	NSpace,
	NLayoutSider,
	NMenu,
	NButton,
	NGrid,
	NGi,
} from "naive-ui";
import type { MenuOption } from "naive-ui";
import {
	BookmarkOutline,
	CaretDownOutline,
	BookOutline,
} from "@vicons/ionicons5";

const menuOptions: MenuOption[] = [
	{
		label: "主页",
		key: "main",
		icon: renderIcon(BookmarkOutline),
	},
	{
		label: "我的设备",
		key: "device",
		icon: renderIcon(CaretDownOutline),
	},
	{
		label: "设置",
		key: "setting",
		icon: renderIcon(BookOutline),
	},
];


function renderIcon(icon: Component) {
	return () => h(NIcon, null, { default: () => h(icon) });
}

export default defineComponent({
	components: {
		TableComp,
		NLayout,
		NSpace,
		NLayoutSider,
		NMenu,
		NConfigProvider,
		NButton,
		NGrid,
		NGi,
	},
	data() {
		return {
			
			cameras: [{ no: 3, title: "Wonderwall" },
	{ no: 4, title: "Don't Look Back in Anger" },
	{ no: 12, title: "Champagne Supernova" },],
		}
	},
	setup() {
		let menuKey = ref("main");
		let collapsed = ref(false);

		const menuChange = (key: string, item: MenuOption) => {
			menuKey.value = key;
		};

		const testdel = (e) => {
			console.log(e);
			window.electronAPI.testdb();
		};
		return {
			menuKey,
			collapsed,
			menuOptions,
			menuChange,
			darkTheme,
			testdel
		};
	},
});
</script>