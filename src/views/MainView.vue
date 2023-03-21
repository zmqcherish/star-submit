<template>
	<n-layout position="absolute">
		<n-layout-header style="height: 60px;">
			<n-space justify="center">
				<n-steps
					style="width:1100px"
					:current="currentStep"
					:status="currentStatus"
				>
					<n-step title="选择图片" />
					<n-step title="填写信息" />
					<n-step title="生成内容" />
				</n-steps>
			</n-space>
		</n-layout-header>
		<n-layout-content
			class="my-layout"
			style="height: 680px;"
		>
			<n-space
				vertical
				:align="'center'"
				v-if="currentStep == 1"
			>
				<img
					v-if="imgSrc"
					:src="imgSrc"
				>
				<n-empty
					v-else
					size="large"
					description="单击选择图片"
					@click="loadImg()"
				>
					<template #icon>
						<n-icon>
							<image-outline />
						</n-icon>
					</template>
				</n-empty>
			</n-space>

			<n-space
				vertical
				align="center"
				v-if="currentStep == 2"
			>
				<n-form
					ref="formRef"
					:model="info"
					:rules="formRules"
					label-placement="left"
					label-width="auto"
					require-mark-placement="right-hanging"
					:style="{width: '500px'}"
				>
					<input-form
						label="作品标题"
						path="title"
						place-holder="作品标题"
						v-model:value="info.title"
					></input-form>
					<n-form-item
						label="作品说明"
						path="desc"
					>
						<n-input
							v-model:value="info.desc"
							placeholder="作品说明"
							type="textarea"
							show-count
							:autosize="{minRows: 3,maxRows: 5}"
						/>
					</n-form-item>
					<input-form
						label="拍摄地点"
						path="place"
						place-holder="拍摄地点"
						v-model:value="info.place"
					></input-form>
					<n-form-item
						label="拍摄日期"
						path="date"
					>
						<n-date-picker
							v-model:value="info.date"
							type="date"
							:is-date-disabled="dateDisabled"
						/>
					</n-form-item>
					<n-form-item
						label="拍摄相机"
						path="camera"
					>
						<n-select
							v-model:value="info.camera"
							:options="cameras"
							key-field="id"
							value-field="label"
						/>
					</n-form-item>
					<n-form-item
						label="拍摄镜头"
						path="lens"
					>
						<n-select
							v-model:value="info.lens"
							:options="lens"
							key-field="id"
							value-field="label"
						/>
					</n-form-item>
					<input-form
						v-for="(item, index) in imgMap"
						:key="index"
						:label="item.v"
						:path="item.k"
						:place-holder="item.tip"
						v-model:value="info[item.k]"
					></input-form>
				</n-form>
			</n-space>

			<n-grid
				:cols="2"
				v-if="currentStep == 3"
			>
				<n-gi
					v-for="(item, index) in infoRes"
					:key="index"
					style="width:400px;height:280px"
				>
					<n-space vertical>
						<n-space justify="space-between">
							<n-space>
								{{ infoRes[index]['typeName'] }}
								<n-divider vertical />
								<n-button
									tertiary
									round
									size="small"
									@click="copy(item.text)"
								>
									复制
								</n-button>
							</n-space>
							<n-button
								tertiary
								round
								type="primary"
								size="small"
								@click="previewEmail(item)"
							>
								预览
							</n-button>
						</n-space>
						<n-input
							v-model:value="infoRes[index]['text']"
							type="textarea"
							:autosize="{minRows: 5,maxRows: 9}"
						/>
					</n-space>
				</n-gi>
			</n-grid>
		</n-layout-content>
		<n-layout-footer
			position="absolute"
			style="height: 60px;"
		>
			<n-space justify="space-around">
				<n-button @click="prev">
					<template #icon>
						<n-icon>
							<chevron-back />
						</n-icon>
					</template>
				</n-button><n-button
					secondary
					round
					v-if="imgSrc && currentStep == 1"
					type="primary"
					@click="loadImg()"
				>更换图片</n-button>
				<n-button @click="next">
					<template #icon>
						<n-icon>
							<chevron-forward />
						</n-icon>
					</template>
				</n-button>
			</n-space>
		</n-layout-footer>
	</n-layout>

	<n-modal
		v-model:show="emailPreview"
		preset="dialog"
		title="邮件预览"
		:positive-text="emailSending ? '发送中...' : '发送'"
		@positive-click="sendEmail"
		:mask-closable="false"
	>
		<n-spin :show="emailSending">
			<n-space vertical>
				{{ emailContent.header }}
				<n-input
					placeholder="邮件敬语，可为空"
					v-model:value="emailContent.start"
				></n-input>
				<n-input
					v-model:value="emailContent.text"
					type="textarea"
					:autosize="{minRows: 8,maxRows: 10}"
				/>
				<n-input
					placeholder="邮件结语，可为空"
					v-model:value="emailContent.end"
				></n-input>
				<n-space
					v-if="emailContent.src"
					justify="space-around"
				>
					<img :src="emailContent.src['data']">
					<n-space vertical>
						<n-text type="success">
							宽： {{ emailContent.src['width'] }}
						</n-text>
						<n-text type="success">
							高： {{ emailContent.src['height'] }}
						</n-text>
					</n-space>
				</n-space>
				<n-text type="error">
					{{ emailMsg }}
				</n-text>
			</n-space>
		</n-spin>
	</n-modal>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import InputForm from "@/components/InputForm.vue";
import { ChevronBack, ChevronForward, ImageOutline } from "@vicons/ionicons5";
import {
	StepsProps,
	NIcon,
	NSteps,
	NStep,
	NSpace,
	NButton,
	NLayout,
	NLayoutContent,
	NLayoutHeader,
	NLayoutFooter,
	NForm,
	NFormItem,
	NInput,
	NDatePicker,
	NSelect,
	FormInst,
	NEmpty,
	NGrid,
	NGi,
	NDivider,
	NModal,
	NText,
	NSpin,
	FormRules,
	useMessage,
} from "naive-ui";
import { getInfoRes, getRule } from "@/utils/util";

const formRules: FormRules = {
	title: getRule("标题不能为空"),
	desc: getRule("描述不能为空"),
	place: getRule("地点不能为空"),
	date: {
		type: "number",
		required: true,
		trigger: ["blur", "change"],
		message: "请选择",
	},
	camera: getRule("请选择"),
	lens: getRule("请选择"),
};

const imgMap = [
	{ k: "aperture", v: "光圈", tip: "光圈，如 F2" },
	{ k: "shutter", v: "快门", tip: "快门，如 20s" },
	{ k: "iso", v: "ISO", tip: "ISO，如 3200" },
	{ k: "other", v: "其它", tip: "其它说明(堆栈、合成等)" },
];

export default defineComponent({
	components: {
		InputForm,
		ChevronBack,
		ChevronForward,
		NIcon,
		NSteps,
		NStep,
		NSpace,
		NButton,
		NLayout,
		NLayoutContent,
		NLayoutHeader,
		NLayoutFooter,
		NForm,
		NFormItem,
		NInput,
		NDatePicker,
		NSelect,
		NEmpty,
		ImageOutline,
		NGrid,
		NGi,
		NDivider,
		NModal,
		NText,
		NSpin,
	},
	setup() {
		const message = useMessage();
		const currentStep = ref<number>(1);
		const formRef = ref<FormInst | null>(null);
		let imgSrc = ref();
		let emailSending = ref(false);
		let emailPreview = ref(false);
		let emailMsg = ref('');
		let emailContent = ref({
			type: "",
			to: "",
			subject: "",
			text: "",
			src: null,
			header: "",
			start: "",
			end: "",
		});
		const elseSetting = window.electronAPI.getData("elseInfo") || {};
		const t1 = window.electronAPI.getData("camera");
		const t2 = window.electronAPI.getData("lens");
		let cameras = ref(t1);
		let lens = ref(t2);

		let info = ref({
			title: null,
			desc: null,
			date: null,
			place: null,
			camera: null,
			lens: null,
			shutter: null,
			aperture: null,
			iso: null,
			other: null,
		});

		let infoRes = ref([]);

		const loadImg = async () => {
			let imgData = await window.electronAPI.getImg();
			imgSrc.value = imgData;
		};

		const next = () => {
			if (currentStep.value == 1) {
				const t1 = window.electronAPI.checkDevice();
				const t2 = window.electronAPI.getData("user");
				if (!t1) {
					message.error("请先添加设备");
					return;
				}

				if (!t2) {
					message.error("请先更新个人信息");
					return;
				}

				if (!imgSrc.value) {
					message.error("请先选择图片");
					return;
				}
				currentStep.value++;
			} else if (currentStep.value == 2) {
				formRef.value?.validate((errors) => {
					if (!errors) {
						const userInfo = window.electronAPI.getData("user");
						const imgInfo = window.electronAPI.getData("imgInfo");
						let rawData = toRaw(info.value);
						rawData["imgType"] = imgInfo["format"];
						let t = getInfoRes(rawData, userInfo);
						infoRes.value = t;
						currentStep.value++;
					} else {
						console.log(errors);
					}
				});
			}
		};

		const prev = () => {
			if (currentStep.value > 1) currentStep.value--;
		};

		const copy = (data) => {
			window.electronAPI.copyText(data);
			message.success("复制成功");
		};

		const previewEmail = async (item) => {
			const type = item["type"];
			emailPreview.value = true;
			emailContent.value = Object.assign({}, item);
			emailContent.value["header"] = "收件人：" + item["to"];
			const emailAttachInfo = await window.electronAPI.getEmailAttach(type);
			emailContent.value["src"] = emailAttachInfo;

			emailContent.value["start"] = elseSetting[type + "start"] || "";
			emailContent.value["end"] = elseSetting[type + "end"] || "";
		};

		const sendEmail = async () => {
			emailMsg.value = '';
			if(emailSending.value) {
				return false;
			}
			emailSending.value = true;
			let val = emailContent.value;
			let text = val["text"];
			if(val["start"]) {
				text = val["start"] + '\n' + text;
				elseSetting[val.type + "start"] = val["start"];
			}
			if(val["end"]) {
				text = text + '\n' + val["end"];
				elseSetting[val.type + "end"] = val["end"];
			}
			window.electronAPI.setData("elseInfo", elseSetting);

			const mailData = {
				to: val["to"],
				subject: val["subject"],
				text,
				attachments: [
					{
						filename: val["attachName"],
						path: val["src"]["path"],
					},
				]
			};

			const sendRes = await window.electronAPI.sendEmail(mailData);
			const status = sendRes['status'];
			if(status) {
				message.success("发送成功");
			} else {
				console.log('send mail fail', sendRes);
				emailMsg.value = "发送失败：" + sendRes['msg'];
			}
			emailSending.value = false;
			return status;
		};

		return {
			formRef,
			formRules,
			imgSrc,
			emailSending,
			emailPreview,
			emailContent,emailMsg,
			currentStatus: ref<StepsProps["status"]>("process"),
			currentStep,
			info,
			infoRes,
			cameras,
			lens,
			imgMap,
			next,
			prev,
			loadImg,
			copy,
			previewEmail,
			sendEmail,
			dateDisabled(ts: number) {
				return ts > Date.now();
			},
		};
	},
});
</script>

<style scoped>
.n-layout-content,
.n-layout-header,
.n-layout-footer {
	background: rgba(16, 16, 20, 0.82);
	padding: 24px;
}
</style>

<style>
.my-layout .n-layout-scroll-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.n-layout-scroll-container .my-a {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>