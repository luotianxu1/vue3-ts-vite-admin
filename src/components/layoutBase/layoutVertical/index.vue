<!-- 纵向布局 -->
<template>
	<el-container>
		<el-aside>
			<div class="menu" :style="{ width: isCollapse ? '65px' : '210px' }">
				<div class="logo flx-center">
					<img :src="url" alt="logo" />
					<span v-show="!isCollapse">管理系统模板</span>
				</div>
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
		<el-container>
			<el-header>
				<HeaderLeft></HeaderLeft>
				<HeaderRight></HeaderRight>
			</el-header>
			<Tabs v-if="globalStore.themeConfig.tabs"></Tabs>
			<el-main>
				<Main></Main>
			</el-main>
			<el-footer v-if="globalStore.themeConfig.footer">
				<Footer></Footer>
			</el-footer>
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

// 是否折叠
const globalStore = GlobalStore()
const isCollapse = computed(() => globalStore.themeConfig.isCollapse)

// 菜单列表
const userStore = UserStore()
const menuList = computed(() => userStore.showMenuListGet)
</script>

<style lang="scss" scoped>
.el-main {
	padding: 0;
	overflow: hidden;
	box-sizing: border-box;
}

.el-footer {
	height: auto;
	padding: 0;
}

.el-container {
	width: 100%;
	height: 100%;

	.el-aside {
		width: auto;
		overflow: inherit;
		background-color: var(--base-color);
		border-right: 1px solid var(--el-border-color);

		.menu {
			display: flex;
			height: 100%;
			transition: all 0.3s ease;
			flex-direction: column;

			.el-scrollbar {
				height: calc(100% - 55px);

				.el-menu {
					overflow-x: hidden;
					border-right: none;
				}
			}

			.logo {
				height: 45px;
				box-sizing: border-box;

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

	.el-header {
		display: flex;
		height: 45px;
		padding: 0 15px;
		background-color: var(--base-color);
		border-bottom: 1px solid var(--el-border-color-light);
		box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
