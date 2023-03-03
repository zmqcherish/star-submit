<template>
	<div class="home">

		<n-button
		type="info"
			@click="loadImg()"
		>选择图片1</n-button>
		<img v-if="src" width="200"
			:src="src"
		>
		<!-- <img width="100" height="100"
			src="../assets/logo.png"
		> -->
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { NButton } from 'naive-ui'

export default {
	components: {
		NButton
	},
	data() {
		return {
			
		}
	},
	setup() {
		const nav = [{
					title: "我的信息",
					name: "info",
					color: "blue",
					icon: "ticket",
					url: "/pages/user-info/index",
				},
				{
					title: "我的信息",
					name: "info",
					color: "blue",
					icon: "ticket",
					url: "/pages/user-info/index",
				},
		];
		let src = ref();
		// let src1 = ref("../assets/logo.png")
		const data = reactive({
			img: "",
		});
		const loadImg = async () => {
			let imgPath = await window.electronAPI.getImg();
			// console.log(imgPath);
			src.value = imgPath
		};
		return {
			loadImg,
			nav,
			src,
			data,
		};
	},
};
</script>

<style scoped>
.nav-list {
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx 40rpx;
	justify-content: space-between;
}

.nav-li {
	padding: 30rpx;
	border-radius: 12rpx;
	width: 45%;
	margin: 0 2.5% 40rpx;
	background-size: cover;
	background-position: center;
	position: relative;
	z-index: 1;
}

.nav-li::after {
	content: "";
	position: absolute;
	z-index: -1;
	background-color: inherit;
	width: 100%;
	height: 100%;
	left: 0;
	bottom: -10%;
	border-radius: 10rpx;
	opacity: 0.2;
	transform: scale(0.9, 0.9);
}

.nav-li.cur {
	color: #fff;
	background: rgb(94, 185, 94);
	box-shadow: 4rpx 4rpx 6rpx rgba(94, 185, 94, 0.4);
}

.nav-title {
	font-size: 32rpx;
	font-weight: 300;
}

.nav-title::first-letter {
	font-size: 40rpx;
	margin-right: 4rpx;
}

.nav-name {
	font-size: 28rpx;
	text-transform: Capitalize;
	margin-top: 20rpx;
	position: relative;
}

.nav-name::before {
	content: "";
	position: absolute;
	display: block;
	width: 40rpx;
	height: 6rpx;
	background: #fff;
	bottom: 0;
	right: 0;
	opacity: 0.5;
}

.nav-name::after {
	content: "";
	position: absolute;
	display: block;
	width: 100rpx;
	height: 1px;
	background: #fff;
	bottom: 0;
	right: 40rpx;
	opacity: 0.3;
}

.nav-name::first-letter {
	font-weight: bold;
	font-size: 36rpx;
	margin-right: 1px;
}

.nav-li text {
	position: absolute;
	right: 30rpx;
	top: 30rpx;
	font-size: 52rpx;
	width: 60rpx;
	height: 60rpx;
	text-align: center;
	line-height: 60rpx;
}
</style>
