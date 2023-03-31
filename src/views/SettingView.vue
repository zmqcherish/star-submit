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
					v-for="(item, index) in userMap"
					:key="index"
					:label="item.v"
					:path="item.k"
					:place-holder="item.tip"
					v-model:value="userInfo[item.k]"
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
					path="service"
				>
					<n-select
						v-model:value="emailInfo.service"
						:options="mailHosts"
						label-field="name"
						value-field="k"
						@update:value="hostChange"
					/>
				</n-form-item>

				<div v-if="emailInfo.service == 'else'">
					<input-form
						v-for="(item, index) in mailMap1"
						:key="index"
						:label="item.v"
						:path="item.k"
						:place-holder="item.tip"
						v-model:value="emailInfo[item.k]"
					></input-form>
				</div>
				<input-form
					v-for="(item, index) in mailMap"
					:key="index"
					:label="item.v"
					:path="item.k"
					:place-holder="item.tip"
					v-model:value="emailInfo[item.k]"
				></input-form>
				<n-form-item
					label="密码"
					path="pwd"
				>
					<n-input
						v-model:value="emailInfo['pwd']"
						type="password"
						show-password-on="mousedown"
						placeholder="根据邮箱类型填写授权码或密码"
					/>
				</n-form-item>
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

		<n-tab-pane
			name="else"
			tab="其它"
		>
			<n-form
				ref="elseFormRef"
				:model="elseInfo"
			>
				<input-form
					v-for="(item, index) in elseMap"
					:key="index"
					:label="item.v"
					v-model:value="elseInfo[item.k]"
				></input-form>
			</n-form>
			<n-button
				type="primary"
				block
				secondary
				strong
				@click="saveElse"
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
	NInput,
	SelectOption,
} from "naive-ui";
import { mailHosts, getRule } from "@/utils/util";

const mailFormRules: FormRules = {
	service: getRule("请选择"),
	host: getRule(),
	port: getRule(),
	email: {
		required: true,
		validator(rule: FormItemRule, value: string) {
			if (!value) {
				return new Error("不能为空");
			}
			if (value.indexOf("@") == -1) {
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

const elseMap = [
	{ k: "csvastart", v: "CSVA邮件敬语" },
	{ k: "csvaend", v: "CSVA邮件结语" },
	{ k: "ncstart", v: "夜空中国邮件敬语" },
	{ k: "ncend", v: "夜空中国邮件结语" },
	{ k: "csstart", v: "国家天文邮件敬语" },
	{ k: "csend", v: "国家天文邮件结语" },
];

const mailMap1 = [
	{ k: "host", v: "服务器", tip: "服务器" },
	{ k: "port", v: "端口号", tip: "端口号" },
];

const mailMap = [{ k: "email", v: "发件人", tip: "发件邮箱" }];

const userMap = [
	{ k: "name", v: "姓名", tip: "姓名" },
	{ k: "nick", v: "署名", tip: "昵称" },
	{ k: "phone", v: "手机号", tip: "手机号" },
];

export default defineComponent({
	components: {
		InputForm,
		NSelect,
		NButton,
		NForm,
		NFormItem,
		NTabs,
		NTabPane,
		NInput,
	},
	setup() {
		const message = useMessage();

		const userFormRef = ref<FormInst | null>(null);
		const mailFormRef = ref<FormInst | null>(null);

		const t1 = window.electronAPI.getData("mail") || {
			service: null,
			host: null,
			port: null,
			email: null,
			pwd: null,
		};
		const t2 = window.electronAPI.getData("user") || {
			name: null,
			nick: null,
			phone: null,
		};
		const t3 = window.electronAPI.getData("elseInfo") || {
			csvastart: null,
			csvaend: null,
			ncstart: null,
			ncend: null,
		};
		let emailInfo = ref(t1);
		let userInfo = ref(t2);
		let elseInfo = ref(t3);

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

		const saveElse = () => {
			let t = toRaw(elseInfo.value);
			window.electronAPI.setData("elseInfo", t);
			message.success("保存成功");
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
			elseInfo,
			elseMap,
			mailMap,
			mailMap1,
			userMap,
			saveMail,
			saveUser,
			saveElse,
			hostChange,
		};
	},
});
</script>