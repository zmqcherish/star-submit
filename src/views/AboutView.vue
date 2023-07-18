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
			"此应用为方便星空摄影师进行创作投稿。目前支持的投稿方式为邮件，投稿渠道可选有CSVA、夜空中国、中国国家天文、北京天文馆。还有更多改进空间，不定期更新。如有bug或其他改进建议，欢迎指正",
	},
	{
		title: "使用说明",
		content:
			"此应用也可仅使用文本生成功能，在最后的步骤中复制相关文案后，使用自己常用的邮件客户端进行发送。如有使用疑问可私信咨询。",
	},
	{
		title: "免责声明",
		content:
			"此应用数据保存在本地，不会收集任何用户信息；请自行查阅发件箱是否有发件内容已确保邮件投递成功",
	},
	{
		title: "邮箱配置",
		content:
			"如果需要使用发送邮件功能，需要配置邮箱的发件人和对应邮箱授权码，不同邮箱授权码获取方式不同，可自行查阅。QQ邮箱：账号与安全（https://wx.mail.qq.com/account）-> 安全设置 -> 生成授权码；163邮箱：https://help.mail.163.com/faq.do?m=list&categoryID=90。更详细的说明请查阅：https://github.com/zmqcherish/star-submit 中邮件配置说明",
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
		title: 'v1.0.8',
		content: '正式发布',
		time: '2023-07-18'
	}
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