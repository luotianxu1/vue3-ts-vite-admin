<template>
	<el-breadcrumb :separator-icon="ArrowRight">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
				<el-link :underline="false" :disabled="index === breadcrumbList.length - 1" @click="goto(item.path)">
					<div class="link">
						<i class="iconfont" :class="item.meta.icon" v-if="globalStore.themeConfig.breadcrumbIcon"></i>
						{{ item.meta.title }}
					</div>
				</el-link>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>
<script setup lang="ts">
import { GlobalStore } from "@/stores/modules/global"
import { ArrowRight } from "@element-plus/icons-vue"
import { GLOB_APP_HOME } from "@/global/constants"
import { UserStore } from "@/stores/modules/user"

const route = useRoute()
const userRouter = useRouter()
const globalStore = GlobalStore()
const userStore = UserStore()

// 获取系统首页路由
const homeData = userStore.flatMenuListGet.filter(item => item.path === GLOB_APP_HOME)[0]

const breadcrumbList = computed(() => {
	let breadcrumbData = userStore.breadcrumbListGet[route.matched[route.matched.length - 1].path]
	if (breadcrumbData[0].path !== GLOB_APP_HOME && homeData) {
		breadcrumbData = [{ path: homeData.path, meta: { icon: homeData.meta.icon, title: homeData.meta.title } }, ...breadcrumbData]
	} else {
		breadcrumbData = []
	}
	return breadcrumbData
})

const goto = (val: string): void => {
	userRouter.push(val)
}
</script>

<style scoped lang="scss">
/* breadcrumb-transform */
.breadcrumb-enter-active {
	transition: all 0.2s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
	opacity: 0;
	transform: translateX(10px);
}

.breadcrumb-box {
	display: flex;
	align-items: center;
	padding-right: 50px;
	overflow: hidden;
	// mask-image: linear-gradient(90deg, #000000 0%, #000000 calc(100% - 50px), transparent);
	.el-breadcrumb {
		white-space: nowrap;
		.el-breadcrumb__item {
			position: relative;
			display: inline-block;
			float: none;
			.el-breadcrumb__inner {
				display: inline-flex;
				.breadcrumb-icon {
					margin-top: 2px;
					margin-right: 6px;
					font-size: 16px;
				}
				.breadcrumb-title {
					margin-top: 3px;
				}
			}
			:deep(.el-breadcrumb__separator) {
				position: relative;
				top: -1px;
			}
		}
	}
}
</style>
