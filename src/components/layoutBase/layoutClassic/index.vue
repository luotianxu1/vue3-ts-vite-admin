<!-- 经典布局 -->
<template>
	<el-container>
		<el-header>
			<div class="header-lf">
				<div class="logo flx-center">
					<img :src="url" alt="logo" />
					<span>管理系统模板</span>
				</div>
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
import Main from "../components/main/Main.vue"
import Tabs from "../components/tabs/index.vue"
import Footer from "../components/footer/index.vue"
import { GlobalStore } from "@/stores/modules/global"
import { UserStore } from "@/stores/modules/user"

// 图标
const url = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")

const globalStore = GlobalStore()
const isCollapse = computed(() => globalStore.themeConfig.isCollapse)

// 菜单列表
const userStore = UserStore()
const menuList = computed(() => userStore.showMenuListGet)
</script>

<style lang="scss" scoped>
.el-container {
	width: 100%;
	height: 100%;

	.el-header {
		display: flex;
		height: 45px;
		padding: 0 15px 0 0;
		background-color: var(--base-color);
		border-bottom: 1px solid var(--el-border-color-light);
		box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;

		.header-lf {
			display: flex;
			align-items: center;

			.logo {
				width: 210px;
				margin-right: 16px;

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
		}
	}

	.el-aside {
		width: auto;
		overflow: inherit;
		background-color: var(--base-color);
		border-right: 1px solid var(--el-border-color);
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
}

.classic-content {
	height: calc(100% - 55px); // 减去头部高度
	.classic-main {
		display: flex;
		flex-direction: column;
	}
}

.el-footer {
	height: auto;
	padding: 0;
}
</style>
