<!-- 分栏布局 -->
<template>
	<el-container class="layout">
		<div class="aside-split">
			<div class="logo flx-center">
				<img :src="url" alt="logo" />
			</div>
			<el-scrollbar>
				<div class="split-list">
					<div
						class="split-item"
						:class="{ 'split-active': splitActive === item.path || `/${splitActive.split('/')[1]}` === item.path }"
						v-for="item in menuList"
						:key="item.path"
						@click="changeSubMenu(item)"
					>
						<i class="iconfont" :class="item.meta.icon"></i>
						<span class="title">{{ item.meta.title }}</span>
					</div>
				</div>
			</el-scrollbar>
		</div>
		<el-aside :class="{ 'not-aside': !subMenu.length }" :style="{ width: isCollapse ? '65px' : '210px' }">
			<Company :showImg="false"></Company>
			<el-scrollbar>
				<el-menu
					:collapse="globalStore.themeConfig.isCollapse"
					:default-active="globalStore.routerActive"
					:router="false"
					:collapse-transition="false"
					:unique-opened="true"
				>
					<TreeMenu :tree-data="subMenu"></TreeMenu>
				</el-menu>
			</el-scrollbar>
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

<script setup lang="ts">
import Main from "../components/main/Main.vue"
import HeaderLeft from "../components/header/HeaderLeft.vue"
import HeaderRight from "../components/header/HeaderRight.vue"
import Company from "../components/header/components/Company.vue"
import Tabs from "../components/tabs/index.vue"
import Footer from "../components/footer/index.vue"
import { GlobalStore } from "@/stores/modules/global"
import { UserStore } from "@/stores/modules/user"
import type { Menu } from "@/types"

const route = useRoute()
const router = useRouter()
const globalStore = GlobalStore()
const userStore = UserStore()
const menuList = computed(() => userStore.showMenuListGet)
const isCollapse = computed(() => globalStore.themeConfig.isCollapse)

// 图标
const url = ref("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")

const subMenu = ref<Menu.IMenuOptions[]>([])
const splitActive = ref<string>("")
watch(
	() => [menuList, route],
	() => {
		// 当前菜单没有数据直接 return
		if (!menuList.value.length) return
		splitActive.value = route.path
		const menuItem = menuList.value.filter(
			(item: Menu.IMenuOptions) => route.path === item.path || `/${route.path.split("/")[1]}` === item.path
		)
		if (menuItem[0].children?.length) return (subMenu.value = menuItem[0].children)
		subMenu.value = []
	},
	{
		deep: true,
		immediate: true
	}
)

// 切换 SubMenu
const changeSubMenu = (item: Menu.IMenuOptions) => {
	splitActive.value = item.path
	if (item.children?.length) return (subMenu.value = item.children)
	subMenu.value = []
	router.push(item.path)
}
</script>

<style lang="scss" scoped>
.aside-split {
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	width: 70px;
	height: 100%;
	border-right: 1px solid var(--el-border-color);

	.logo {
		height: 45px;
		border-bottom: 1px solid var(--el-border-color);
		box-sizing: border-box;

		img {
			width: 30px;
			object-fit: contain;
		}
	}

	.el-scrollbar {
		height: calc(100% - 55px);

		.split-list {
			flex: 1;

			.split-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 70px;
				cursor: pointer;
				transition: all 0.3s ease;

				&:hover {
					background-color: var(--el-menu-hover-bg-color);
				}

				.el-icon {
					font-size: 21px;
				}

				.title {
					margin-top: 6px;
					font-size: 12px;
					transform: scale(0.96);
				}
			}
		}
	}
}

.el-aside {
	display: flex;
	height: 100%;
	overflow: hidden;
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
		border-bottom: 1px solid var(--el-border-color);
		box-sizing: border-box;

		span {
			font-size: 20px;
			font-weight: bold;
			white-space: nowrap;
		}
	}
}

.not-aside {
	width: 0 !important;
}
</style>
