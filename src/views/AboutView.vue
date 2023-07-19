<template>
	<n-space justify="center">
		<n-h1 type="success">
			<n-text type="success">
				星空作品投稿工具v1.1.2
			</n-text>
		</n-h1>
	</n-space>
	<div v-for="(item, index) in displayData"
		:key="index"
	>
		<n-h2 prefix="bar">{{ item.title }}</n-h2>
		<n-h6 v-for="(item1, index1) in item['contents']"
				:key="index1">
				· {{ item1 }}
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

	<n-h2 prefix="bar"> 赞赏 </n-h2>
	<img src="../assets/zsm.jpg">
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NH1, NH2, NH6, NTimeline, NTimelineItem, NText, NSpace } from "naive-ui";

const displayData = [
	{
		title: "关于",
		contents: [
		"此应用开发的初衷是方便星空摄影师进行创作投稿",
		"针对国内的星空作品投稿渠道（CSVA、夜空中国、中国国家天文、北京天文馆）本应用可以方便的生成不同渠道所要求的文案格式以及邮件标题及内容等，可以直接进行邮件投递",
		"此应用也可仅使用文本生成功能，在最后的步骤中复制相关文案后，使用自己常用的邮件客户端进行发送",
		"此应用还有更多改进空间，不定期更新",
		"如有使用疑问、bug或其他改进建议，欢迎大家通过最后的联系方式私信指正",
		],
	},
	{
		title: "免责声明",
		contents: [
			"此应用数据保存在本地，不会收集任何用户信息",
			"请自行查阅发件箱是否有发件内容已确保邮件投递成功",
		],
	},
	{
		title: "邮箱配置",
		contents: [
		"如果需要使用发送邮件功能，需要配置邮箱的发件人和对应邮箱授权码，不同邮箱授权码获取方式不同",
		"QQ邮箱：账号与安全(https://wx.mail.qq.com/account) -> 安全设置 -> 生成授权码。查看详情: https://wx.mail.qq.com/list/readtemplate?name=app_intro.html#/agreement/authorizationCode)",
		"163邮箱：https://help.mail.163.com/faq.do?m=list&categoryID=90 -> 如何开启客户端协议？",
		"GMail邮箱：较为繁琐不推荐，配置方法请查阅：https://github.com/zmqcherish/star-submit 中邮件配置说明",
		"其它邮箱获取方式可自行查阅",
		],
	},
	{
		title: "作者",
		contents: [
			"星联CSVA星空摄影师 ｜ RAW.cn 供稿人 ｜ 视觉中国签约摄影师 ｜ 张明群",
		],
	},
	{
		title: "联系我",
		contents: [
			"小红书：冰山里求生的武装 ｜ 微博：甄星cherish ｜ 微信：cherish_hebe",
		],
	},
	{
		title: "项目地址",
		contents: [
			"https://github.com/zmqcherish/star-submit",
		],
	}
];

const history = [
	{
		title: 'v1.1.2',
		content: '更新关于页',
		time: '2023-07-19'
	},
	{
		title: 'v1.1.0',
		content: '正式发布',
		time: '2023-07-19'
	}
]

export default defineComponent({
	components: {
		NH1,NH2,
		NH6,NTimeline, NTimelineItem,NText,NSpace
	},
	setup() {
		return {
			displayData,
			history
		};
	},
});
</script>