<template>
	<div class="left">
		<el-icon @click="changAside" id="collapseIcon">
			<Expand v-if="globalStore.themeConfig.isCollapse"></Expand>
			<Fold v-else></Fold>
		</el-icon>
		<BreadCrumb id="breadcrumb" v-if="globalStore.themeConfig.breadcrumb"></BreadCrumb>
	</div>
</template>

<script lang="ts" setup>
import { GlobalStore } from "@/stores/modules/global"
import BreadCrumb from "./components/BreadCrumb.vue"
import { Expand, Fold } from "@element-plus/icons-vue"

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
	margin-right: 20px;
	font-size: 22px;
	cursor: pointer;

	&:hover {
		color: var(--el-color-primary);
	}
}
</style>
