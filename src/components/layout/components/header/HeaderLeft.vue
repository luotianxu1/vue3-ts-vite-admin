<template>
	<div class="left">
		<el-icon @click="changAside" id="collapseIcon">
			<i class="iconfont" :class="globalStore.themeConfig.isCollapse ? 'icon-mulushousuo ' : 'icon-muluzhankai'"></i>
		</el-icon>
		<BreadCrumb class="breadCrumb" id="breadcrumb" v-if="globalStore.themeConfig.breadcrumb"></BreadCrumb>
	</div>
</template>

<script lang="ts" setup>
import { GlobalStore } from "@/stores/modules/global"
import BreadCrumb from "./components/BreadCrumb.vue"

const globalStore = GlobalStore()
const changAside = () => {
	globalStore.themeConfig.isCollapse = !globalStore.themeConfig.isCollapse
}
</script>

<style lang="scss" scoped>
.left {
	display: flex;
	align-items: center;
}

i {
	font-size: 20px;
	font-weight: 600;
	cursor: pointer;

	&:hover {
		color: var(--el-color-primary);
	}
}

.breadCrumb {
	margin-left: 20px;
}
</style>
