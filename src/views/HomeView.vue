<template>
	<n-layout
		has-sider
		style="height: 840px;"
		position="absolute"
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
				v-model:value="menuKey"
			/>
		</n-layout-sider>
		<n-layout
			v-if="menuKey == 'main'"
			style="margin: 20px 10px"
		>
			<main-view />
		</n-layout>
		<n-layout
			v-if="menuKey == 'device'"
			style="padding: 30px"
		>
			<device-view />
		</n-layout>
		<n-layout
			v-if="menuKey == 'setting'"
			style="padding: 30px"
		>
			<setting-view />
		</n-layout>
		<n-layout
			v-if="menuKey == 'about'"
			style="padding: 50px"
		>
			<about-view />
		</n-layout>
	</n-layout>
</template>

<script lang="ts">
import MainView from "@/views/MainView.vue";
import DeviceView from "@/views/DeviceView.vue";
import SettingView from "@/views/SettingView.vue";
import AboutView from "@/views/AboutView.vue";
import { h, ref, defineComponent, Component } from "vue";
import {
	NIcon,
	NLayout,
	NLayoutSider,
	NMenu,
	useDialog,
} from "naive-ui";
import type { MenuOption } from "naive-ui";
import {
	BookmarkOutline,
	CameraOutline,
	SettingsOutline,
	AlertCircleOutline
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
		icon: renderIcon(CameraOutline),
	},
	{
		label: "设置",
		key: "setting",
		icon: renderIcon(SettingsOutline),
	},
	{
		label: "关于",
		key: "about",
		icon: renderIcon(AlertCircleOutline),
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
		AboutView,
		NLayout,
		NLayoutSider,
		NMenu,
	},
	setup() {
		const dialog = useDialog();
		let menuKey = ref("main");
		let collapsed = ref(false);

		const t1 = window.electronAPI.checkDevice();
		const t2 = window.electronAPI.getData("user");
		if (!t1 || !t2) {
			dialog.warning({
				title: "提示",
				content: "使用前请先填写个人信息与设备列表",
				positiveText: "好的",
				maskClosable: false,
				onPositiveClick: () => {
					if (!t2) {
						menuKey.value = "setting";
					} else {
						menuKey.value = "device";
					}
				},
			});
		}

		return {
			menuKey,
			collapsed,
			menuOptions,
		};
	},
});
</script>