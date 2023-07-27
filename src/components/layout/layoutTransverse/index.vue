<!-- 横向布局 -->
<template>
	<el-container class="layout">
		<el-header>
			<Company></Company>
			<el-menu
				mode="horizontal"
				:collapse="globalStore.themeConfig.isCollapse"
				:default-active="globalStore.routerActive"
				:router="false"
				:collapse-transition="false"
				:unique-opened="true"
			>
				<template v-for="subItem in menuList" :key="subItem.path">
					<el-sub-menu v-if="subItem.children?.length" :index="subItem.path" :key="subItem.path + 'el-sub-menu'">
						<template #title>
							<i class="iconfont" :class="subItem.meta.icon"></i>
							<span>{{ subItem.meta.title }}</span>
						</template>
						<TreeMenu :tree-data="subItem.children"></TreeMenu>
					</el-sub-menu>
					<el-menu-item v-else :index="subItem.path" :key="subItem.path + 'el-menu-item'" @click="handleClickMenu(subItem)">
						<i class="iconfont" :class="subItem.meta.icon"></i>
						<template #title>
							<span>{{ subItem.meta.title }}</span>
						</template>
					</el-menu-item>
				</template>
			</el-menu>
			<HeaderRight></HeaderRight>
		</el-header>
		<el-main class="test">
			<Main></Main>
		</el-main>
		<el-footer v-if="globalStore.themeConfig.footer">
			<Footer></Footer>
		</el-footer>
	</el-container>
</template>

<script setup lang="ts">
import Main from "../components/main/Main.vue"
import HeaderRight from "../components/header/HeaderRight.vue"
import Company from "../components/header/components/Company.vue"
import { GlobalStore } from "@/stores/modules/global"
import { UserStore } from "@/stores/modules/user"
import type { IMenuOptions } from "@/types"

const router = useRouter()
const globalStore = GlobalStore()
const userStore = UserStore()
const menuList = computed(() => userStore.showMenuListGet)

const handleClickMenu = (subItem: IMenuOptions) => {
	if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank")
	router.push(subItem.path)
}
</script>

<style lang="scss" scoped>
.el-header {
	padding-left: 0;
}

.el-menu {
	height: 45px;
	overflow: hidden;
	flex: 1;
	border-bottom: 1px solid var(--el-border-color-light);

	.is-active {
		border-bottom-color: var(--el-color-primary) !important;

		&:hover {
			color: #fff !important;
		}
	}
}
</style>
