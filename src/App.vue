<template>
	<n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
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
						:on-update:value="menuChange"
					/>
				</n-layout-sider>
				<n-layout v-if="menuKey == 'main'" style="margin: 20px 10px">
					<main-view></main-view>
				</n-layout>
				<n-layout v-if="menuKey == 'device'" style="padding: 20px">
					<device-view></device-view>
				</n-layout>
				<n-layout v-if="menuKey == 'setting'">
					<span>设置</span>
				</n-layout>
			</n-layout>
		</n-space>
	</n-config-provider>
</template>

<script lang="ts">
import MainView from "@/views/MainView.vue";
import DeviceView from "@/views/DeviceView.vue";
import { h, ref, defineComponent, Component } from "vue";
import {
	zhCN,
	dateZhCN,
	darkTheme,
	NConfigProvider,
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
		MainView,
		DeviceView,
		NLayout,
		NSpace,
		NLayoutSider,
		NMenu,
		NConfigProvider,
	},
	setup() {
		let menuKey = ref("main");
		let collapsed = ref(false);

		const menuChange = (key: string, item: MenuOption) => {
			menuKey.value = key;
		};

		return {
			menuKey,
			collapsed,
			menuOptions,
			menuChange,
			darkTheme,dateZhCN,zhCN
		};
	},
});
</script>