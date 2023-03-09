<template>
	<n-config-provider
		:theme="darkTheme"
		:locale="zhCN"
		:date-locale="dateZhCN"
	>
		<n-message-provider>
			<router-view />
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
} from "naive-ui";

export default defineComponent({
	components: {
		NConfigProvider,
		NMessageProvider,
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