<template>
	<n-config-provider
		:theme="darkTheme"
		:locale="zhCN"
		:date-locale="dateZhCN"
	>
		<n-message-provider>
			<n-dialog-provider>
				<router-view />
			</n-dialog-provider>
		</n-message-provider>
	</n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
	zhCN,
	dateZhCN,
	darkTheme,
	NConfigProvider,
	NMessageProvider,
	NDialogProvider,
} from "naive-ui";

export default defineComponent({
	components: {
		NConfigProvider,
		NMessageProvider,
		NDialogProvider
	},
	setup() {
		return {
			darkTheme,
			dateZhCN,
			zhCN,
		};
	},
});
</script>