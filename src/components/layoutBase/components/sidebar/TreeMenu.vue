<template>
	<template v-for="item in props.treeData" :key="item._id">
		<el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
			<template #title>
				<i class="iconfont" :class="item.meta.icon"></i>
				<span>{{ item.meta.title }}</span>
			</template>
			<TreeMenu :tree-data="item.children"></TreeMenu>
		</el-sub-menu>
		<el-menu-item v-else :index="item.path" @click="handleClickMenu(item)">
			<i class="iconfont" :class="item.meta.icon"></i>
			<template #title>
				<span>{{ item.meta.title }}</span>
			</template>
		</el-menu-item>
	</template>
</template>

<script lang="ts" setup>
import router from "@/router"
import type { IMenuOptions } from "@/types"
import type { RouteLocationRaw } from "vue-router"

interface Props {
	treeData: Array<IMenuOptions>
}

const props = withDefaults(defineProps<Props>(), {
	treeData: () => []
})

const handleClickMenu = (item: { path: RouteLocationRaw }) => {
	// if (item.meta.isLink) return window.open(item.meta.isLink, "_blank")
	router.push(item.path)
}
</script>

<style scoped lang="scss">
i {
	font-size: 18px;
	padding: 0 5px;
}

.el-menu-item {
	&:hover {
		color: var(--el-menu-hover-text-color);
	}
	&.is-active {
		color: var(--el-menu-active-color) !important;
		background-color: var(--el-color-primary-light-9) !important;
	}
}
</style>
