<template>
	<div class="home">

		<!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
		<MDBBtn
			color="info"
			size="lg"
			@click="loadImg()"
		>选择图片</MDBBtn>
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
import { MDBBtn } from "mdb-vue-ui-kit";

export default {
	components: {
		// HelloWorld,
		MDBBtn,
	},
	setup() {
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
			src,
			data,
		};
	},
};
</script>
