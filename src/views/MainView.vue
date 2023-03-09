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
		<n-layout-content style="height: 640px;">
			<n-space
				vertical
				:align="'center'"
				v-if="currentStep == 1"
				:style="imgSrc ? '' : 'margin-top: 200px'"
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
				:align="'center'"
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
							value-field="label"
						/>
					</n-form-item>
					<input-form
						label="光圈"
						path="aperture"
						place-holder="光圈，如 F4"
						v-model:value="info.aperture"
					></input-form>
					<input-form
						label="快门"
						path="shutter"
						place-holder="快门，如 1/200s"
						v-model:value="info.shutter"
					></input-form>
					<input-form
						label="ISO"
						path="iso"
						place-holder="ISO，如 100"
						v-model:value="info.iso"
					></input-form>
					<input-form
						label="其它说明"
						path="other"
						place-holder="其它说明(堆栈、合成等)"
						v-model:value="info.other"
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
					style="width:400px;height:300px"
				>
					<n-space vertical>
						<n-space>
							这个<n-divider vertical /><n-button
								tertiary
								round
								size="small"
								@click="copy()"
							>
								复制</n-button></n-space>
						<n-input
							v-model:value="infoRes[index]"
							type="textarea"
							:autosize="{minRows: 5,maxRows: 10}"
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
	FormRules,
} from "naive-ui";
import { getInfoRes, formatTime, getRule } from "@/utils/util";

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
	camera: getRule('请选择'),
	lens: getRule('请选择')
};

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
	},
	setup() {
		const currentStep = ref<number>(1);
		const formRef = ref<FormInst | null>(null);
		let imgSrc = ref();
		let imgWidth = ref(600);
		let imgHeight = ref(0);

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

			// const path = window.electronAPI.getData('wallpaper');
			// await setWallpaper(path);
		};

		const next = () => {
			if (currentStep.value == 1) {
				if (!imgSrc.value) {
					// return;
				}
				currentStep.value++;
			} else if (currentStep.value == 2) {
				console.log(toRaw(info.value));
				console.log(formatTime(toRaw(info.value)["date"]));

				formRef.value?.validate((errors) => {
					if (!errors) {
						let t = getInfoRes(toRaw(info.value));
						infoRes.value.push(t);
						currentStep.value++;
					} else {
						console.log(errors);
					}
				});
			}
			// if (currentStep.value < 3) currentStep.value++;
		};

		const prev = () => {
			if (currentStep.value > 1) currentStep.value--;
		};

		const copy = () => {
			window.electronAPI.copyText("111");
		};

		return {
			formRef,
			formRules,
			imgSrc,
			imgWidth,
			imgHeight,
			currentStatus: ref<StepsProps["status"]>("process"),
			currentStep,
			info,
			infoRes,
			next,
			prev,
			loadImg,
			copy,
			cameras,
			lens,
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