<template>
	<div
		v-for="(item, index) in displayData"
		:key="index"
	>
		<n-h2 prefix="bar">{{ item.title }}</n-h2>
		<n-h6 style="margin-bottom: 50px;">
			{{ item.content }}
		</n-h6>
	</div>
	<n-h2 prefix="bar"> 更新历史 </n-h2>
	<n-timeline>
		<n-timeline-item v-for="(item, index) in history"
		:key="index"
			type="success"
			:title="item.title"
			:content="item.content"
			:time="item.time"
			/>
	</n-timeline>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NH2, NH6, NTimeline, NTimelineItem } from "naive-ui";

const displayData = [
	{
		title: "关于",
		content:
			"此应用为方便星空摄影师进行创作投稿。目前支持的投稿方式为邮件，投稿渠道可选有CSVA、夜空中国、中国国家天文。还有跟多改进空间，不定期更新。",
	},
	{
		title: "邮箱配置",
		content:
			"如果需要使用发送邮件功能，需要配置邮箱的发件人和对应邮箱授权码，不同邮箱授权码获取方式不同，可自行查阅",
	},
	{
		title: "作者",
		content:
			"星联CSVA星空摄影师 ｜ RAW.cn 供稿人 ｜ 视觉中国签约摄影师 ｜ 张明群",
	},

	{
		title: "联系我",
		content:
			"小红书：冰山里求生的武装 ｜ 微博：甄星cherish ｜ 微信：cherish_hebe",
	},
];

const history = [
	{
		title: 'v1.0',
		content: '正式发布',
		time: '2023-03-22'
	},
	// {
	// 	title: 'v1.0',
	// 	content: '正式发布',
	// 	time: '2023-03-22'
	// },
]

export default defineComponent({
	components: {
		NH2,
		NH6,NTimeline, NTimelineItem
	},
	setup() {
		return {
			displayData,
			history
		};
	},
});
</script>