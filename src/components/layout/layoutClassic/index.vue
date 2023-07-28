<!-- 经典布局 -->
<template>
	<el-container>
		<el-header>
			<div class="header-lf">
				<Company></Company>
				<HeaderLeft></HeaderLeft>
			</div>
			<HeaderRight></HeaderRight>
		</el-header>
		<el-container class="classic-content">
			<el-aside>
				<div class="menu" :style="{ width: isCollapse ? '65px' : '210px' }">
					<el-scrollbar>
						<el-menu
							:collapse="globalStore.themeConfig.isCollapse"
							:default-active="globalStore.routerActive"
							:router="false"
							:collapse-transition="false"
							:unique-opened="true"
						>
							<TreeMenu :tree-data="menuList"></TreeMenu>
						</el-menu>
					</el-scrollbar>
				</div>
			</el-aside>
			<el-container class="classic-main">
				<Tabs v-if="globalStore.themeConfig.tabs"></Tabs>
				<el-main>
					<Main></Main>
				</el-main>
				<el-footer v-if="globalStore.themeConfig.footer">
					<Footer></Footer>
				</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script lang="ts" setup>
import HeaderLeft from "../components/header/HeaderLeft.vue"
import HeaderRight from "../components/header/HeaderRight.vue"
import Company from "../components/header/components/Company.vue"
import Main from "../components/main/Main.vue"
import Tabs from "../components/tabs/index.vue"
import Footer from "../components/footer/index.vue"
import { GlobalStore } from "@/stores/modules/global"
import { UserStore } from "@/stores/modules/user"

const globalStore = GlobalStore()
const isCollapse = computed(() => globalStore.themeConfig.isCollapse)

// 菜单列表
const userStore = UserStore()
const menuList = computed(() => userStore.showMenuListGet)
</script>

<style lang="scss" scoped>
.el-header {
	padding-left: 0;

	.header-lf {
		display: flex;
		align-items: center;
	}
}

.el-aside {
	width: auto;
	overflow: inherit;
	transition: all 0.3s ease;

	.menu {
		display: flex;
		height: 100%;
		transition: all 0.3s ease;
		flex-direction: column;

		.el-menu {
			overflow-x: hidden;
			border-right: none;
		}
	}
}

.classic-content {
	height: calc(100% - 55px); // 减去头部高度
	.classic-main {
		display: flex;
		flex-direction: column;
	}
}
</style>
