<template>
	<n-space vertical>
		<n-layout has-sider>
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
					:render-label="renderMenuLabel"
					:render-icon="renderMenuIcon"
					:expand-icon="expandIcon"
				/>
			</n-layout-sider>
			<n-layout>
				<span>内容</span>
			</n-layout>
		</n-layout>
	</n-space>
</template>

<script lang="ts">
import { h, ref, defineComponent } from "vue";
import { NIcon, NLayout, NSpace, NLayoutSider, NMenu } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";

const menuOptions: MenuOption[] = [
	{
		label: "且听风吟",
		key: "hear-the-wind-sing",
	},
	{
		label: "寻羊冒险记",
		key: "a-wild-sheep-chase",
	},
	{
		label: "舞，舞，舞",
		key: "dance-dance-dance",
	},
];

export default defineComponent({
	components: {
		NLayout,
		NSpace,
		NLayoutSider,
		NMenu
	},
	setup() {
		return {
			collapsed: ref(false),
			menuOptions,
			renderMenuLabel(option: MenuOption) {
				if ("href" in option) {
					return h(
						"a",
						{ href: option.href, target: "_blank" },
						option.label as string
					);
				}
				return option.label as string;
			},
			renderMenuIcon(option: MenuOption) {
				// 渲染图标占位符以保持缩进
				if (option.key === "sheep-man") return true;
				// 返回 falsy 值，不再渲染图标及占位符
				if (option.key === "food") return null;
				return h(NIcon, null, { default: () => h(BookmarkOutline) });
			},
			expandIcon() {
				return h(NIcon, null, { default: () => h(CaretDownOutline) });
			},
		};
	},
});
</script>