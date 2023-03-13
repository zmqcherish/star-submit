<template>
	<n-tabs
		default-value="info"
		size="large"
		animated
		pane-style="padding: 50px 150px; box-sizing: border-box;"
	>
		<n-tab-pane
			name="info"
			tab="个人信息"
		>
			<n-form
				ref="userFormRef"
				:model="userInfo"
				:rules="userFormRules"
			>
				<input-form
					label="姓名"
					path="name"
					place-holder="姓名"
					v-model:value="userInfo.name"
				></input-form>
				<input-form
					label="署名"
					path="nick"
					place-holder="昵称"
					v-model:value="userInfo.nick"
				></input-form>
				<input-form
					label="手机号"
					path="phone"
					place-holder="手机号"
					v-model:value="userInfo.phone"
				></input-form>
			</n-form>
			<n-button
				type="primary"
				block
				secondary
				strong
				@click="saveUser"
			>
				保存
			</n-button>
		</n-tab-pane>
		<n-tab-pane
			name="email"
			tab="邮箱"
		>
			<n-form
				ref="mailFormRef"
				:model="emailInfo"
				:rules="mailFormRules"
			>
				<n-form-item
					label="邮箱服务"
					path="hostKey"
				>
					<n-select
						v-model:value="emailInfo.hostKey"
						:options="mailHosts"
						label-field="name"
						value-field="k"
						@update:value="hostChange"
					/>
				</n-form-item>

				<input-form
					label="服务器"
					path="host"
					place-holder="邮箱服务器"
					v-model:value="emailInfo.host"
				></input-form>
				<input-form
					label="端口号"
					path="port"
					place-holder="端口号"
					v-model:value="emailInfo.port"
				></input-form>
				<input-form
					label="发件人"
					path="email"
					place-holder="发件邮箱"
					v-model:value="emailInfo.email"
				></input-form>
				<input-form
					label="密码"
					path="pwd"
					place-holder="授权码，不是登录密码"
					v-model:value="emailInfo.pwd"
				></input-form>
			</n-form>
			<n-button
				type="primary"
				block
				secondary
				strong
				@click="saveMail"
			>
				保存
			</n-button>
		</n-tab-pane>
	</n-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import InputForm from "@/components/InputForm.vue";
import {
	useMessage,
	NButton,
	NForm,
	NFormItem,
	NSelect,
	FormInst,
	FormItemRule,
	FormRules,
	NTabs,
	NTabPane,
	SelectOption,
} from "naive-ui";
import { mailHosts, getRule } from "@/utils/util";

const mailFormRules: FormRules = {
	hostKey: getRule("请选择"),
	host: getRule(),
	port: getRule(),
	email: {
			required: true,
			validator(rule: FormItemRule, value: string) {
				if (!value) {
					return new Error("不能为空");
				}
				if (value.indexOf('@') == -1) {
					return new Error("格式错误");
				}
				return true;
			},
			trigger: ["blur"],
		},
	pwd: getRule(),
};

const userFormRules: FormRules = {
	name: getRule(),
	nick: getRule(),
	phone: [
		{
			required: false,
			validator(rule: FormItemRule, value: string) {
				if (!value) {
					return true;
				}
				if (!/^\d{11}/.test(value)) {
					return new Error("格式错误");
				}
				return true;
			},
			trigger: ["input", "blur"],
		},
	],
};

export default defineComponent({
	components: {
		InputForm,
		NSelect,
		NButton,
		NForm,
		NFormItem,
		NTabs,
		NTabPane,
	},
	setup() {
		const message = useMessage();

		const userFormRef = ref<FormInst | null>(null);
		const mailFormRef = ref<FormInst | null>(null);

		const t1 = window.electronAPI.getData("mail") || {
			hostKey: null,
			host: null,
			port: null,
			email: null,
			pwd: null
		};
		const t2 = window.electronAPI.getData("user") || {
			name: null,
			nick: null,
			phone: null,
		};
		let emailInfo = ref(t1);
		let userInfo = ref(t2);

		const saveMail = () => {
			mailFormRef.value?.validate((errors) => {
				if (!errors) {
					let t = toRaw(emailInfo.value);
					window.electronAPI.setData("mail", t);
					message.success("邮箱配置成功");
				} else {
					console.log(errors);
				}
			});
		};

		const saveUser = () => {
			userFormRef.value?.validate((errors) => {
				if (!errors) {
					let t = toRaw(userInfo.value);
					window.electronAPI.setData("user", t);
					message.success("用户信息保存成功");
				} else {
					console.log(errors);
					// message.error("保存失败");
				}
			});
		};

		const hostChange = (value: string, opt: SelectOption) => {
			emailInfo.value["host"] = opt["host"];
			emailInfo.value["port"] = opt["port"];
		};

		return {
			mailHosts,
			userFormRef,
			mailFormRef,
			mailFormRules,
			userFormRules,
			userInfo,
			emailInfo,
			saveMail,
			saveUser,
			hostChange,
		};
	},
});
</script>