<template>
  <div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
	<cu-input v-model="pValue"
				title="item"
				placeholder="请输入"
			/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CuInput from '@/components/CuInput.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
	CuInput
  },
  data() {
            return {
                pValue: '11'
            }
        }
});
</script>
