<template>
	<el-dropdown trigger="click">
		<el-button size="small" type="primary">
			<span>更多</span>
			<el-icon class="el-icon--right"><ArrowDown /></el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="refresh">
					<el-icon><RefreshRight /></el-icon>刷新
				</el-dropdown-item>
				<el-dropdown-item @click="closeCurrentTab">
					<el-icon><Remove /></el-icon>关闭当前
				</el-dropdown-item>
				<el-dropdown-item @click="closeOtherTab">
					<el-icon><CircleClose /></el-icon>关闭其他
				</el-dropdown-item>
				<el-dropdown-item @click="closeAllTab">
					<el-icon><FolderRemove /></el-icon>关闭所有
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { GLOB_APP_HOME } from "@/global/constants"
import { GlobalStore } from "@/stores/modules/global"
import eventHub from "@/utils/eventHub"
import { ArrowDown, RefreshRight, CircleClose, Remove, FolderRemove } from "@element-plus/icons-vue"

const globalStore = GlobalStore()

// 关闭当前
const closeCurrentTab = () => {
	if (globalStore.routerActive === GLOB_APP_HOME) {
		return
	}
	globalStore.removeTabs(globalStore.routerActive)
}

// 关闭其他
const closeOtherTab = () => {
	globalStore.closeMultipleTab(globalStore.routerActive)
}

// 关闭所有
const closeAllTab = () => {
	globalStore.closeMultipleTab()
	globalStore.goHome()
}

const refresh = () => {
	eventHub.emit("refresh")
}
</script>

<style scoped lang="scss">
.tabs-box {
	:deep(.tabs-menu) {
		position: relative;
		width: 100%;

		.el-dropdown {
			position: absolute;
			top: 8px;
			right: 13px;
		}

		.tabs-icon {
			top: 2px;
		}

		.el-tabs__nav-wrap {
			position: absolute;
			width: calc(100% - 120px);
		}

		.el-tabs--card > .el-tabs__header {
			height: 40px;
			padding: 0 10px;
			margin: 0;
			box-sizing: border-box;
		}

		.el-tabs--card > .el-tabs__header .el-tabs__nav {
			border: none;
		}

		.el-tabs--card > .el-tabs__header .el-tabs__item {
			color: #ccc;
			border: none;
		}

		.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
			color: hsl(219, 69%, 56%);
			border-bottom: 2px solid hsl(219, 69%, 56%);
		}

		.el-tabs__item .is-icon-close svg {
			margin-top: 0.5px;
		}
	}
}
</style>
