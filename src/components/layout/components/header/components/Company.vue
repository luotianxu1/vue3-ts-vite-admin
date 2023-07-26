<template>
	<div class="logo flx-center" :style="{ width: isCollapse ? '65px' : '210px' }">
		<img :src="url" alt="logo" v-if="props.showImg" />
		<span v-show="!isCollapse">管理系统模板</span>
	</div>
</template>

<script lang="ts" setup>
import { GlobalStore } from "@/stores/modules/global"

interface Props {
	showImg: boolean
}
const props = withDefaults(defineProps<Props>(), {
	showImg: true
})

// 图标
const url = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")

// 是否折叠
const globalStore = GlobalStore()
const isCollapse = computed(() => globalStore.themeConfig.isCollapse)
</script>

<style lang="scss" scoped>
.logo {
	width: 100%;
	height: 45px;

	span {
		font-size: 20px;
		font-weight: bold;
		white-space: nowrap;
	}

	img {
		width: 30px;
		margin-right: 6px;
		object-fit: contain;
	}
}
</style>
