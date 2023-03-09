<template>
	<n-space vertical>
		<n-layout
			has-sider
			style="height: 760px;"
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
					@update:value="menuChange"
				/>
			</n-layout-sider>
			<n-layout
				v-if="menuKey == 'main'"
				style="margin: 20px 10px"
			>
				<main-view></main-view>
			</n-layout>
			<n-layout
				v-if="menuKey == 'device'"
				style="padding: 30px"
			>
				<device-view></device-view>
			</n-layout>
			<n-layout
				v-if="menuKey == 'setting'"
				style="padding: 30px"
			>

				<setting-view />

			</n-layout>
		</n-layout>
	</n-space>
</template>

<script lang="ts">
import MainView from "@/views/MainView.vue";
import DeviceView from "@/views/DeviceView.vue";
import SettingView from "@/views/SettingView.vue";
import { h, ref, defineComponent, Component } from "vue";
import {
	zhCN,
	dateZhCN,
	darkTheme,
	NIcon,
	NLayout,
	NSpace,
	NLayoutSider,
	NMenu,
} from "naive-ui";
import type { MenuOption } from "naive-ui";
import {
	BookmarkOutline,
	CaretDownOutline,
	BookOutline,
} from "@vicons/ionicons5";

const menuOptions: MenuOption[] = [
	{
		label: "邮件内容",
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
		SettingView,
		MainView,
		DeviceView,
		NLayout,
		NSpace,
		NLayoutSider,
		NMenu,
	},
	setup() {
		let menuKey = ref("main");
		let collapsed = ref(false);

		const menuChange = (key: string, item: MenuOption) => {
			if (menuKey.value == "main") {
				// return;
			}
			menuKey.value = key;
		};

		return {
			menuKey,
			collapsed,
			menuOptions,
			menuChange,
			darkTheme,
			dateZhCN,
			zhCN,
		};
	},
});
</script>