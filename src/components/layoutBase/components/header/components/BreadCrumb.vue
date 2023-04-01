<template>
	<el-breadcrumb :separator-icon="ArrowRight">
		<!-- <transition-group name="breadcrumb" mode="out-in"> -->
		<el-breadcrumb-item :key="GLOB_APP_HOME" :to="{ path: GLOB_APP_HOME }">
			<div class="link">
				<i class="iconfont icon-home" v-if="globalStore.themeConfig.breadcrumbIcon"></i>
				首页
			</div>
		</el-breadcrumb-item>
		<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
			<el-link :underline="false" :disabled="index === breadcrumbList.length - 1" @click="goto(item.path)">
				<div class="link">
					<i class="iconfont" :class="item.meta.icon" v-if="globalStore.themeConfig.breadcrumbIcon"></i>
					{{ item.meta.title }}
				</div>
			</el-link>
		</el-breadcrumb-item>
		<!-- </transition-group> -->
	</el-breadcrumb>
</template>
<script setup lang="ts">
import GlobalStore from "@/stores/global/global"
import { ArrowRight } from "@element-plus/icons-vue"
import { GLOB_APP_HOME } from "@/global/constants"
import userLoginStore from "@/stores/login/login"

const globalStore = GlobalStore()
const route = useRoute()
const userRouter = useRouter()

// 菜单列表
const userStore = userLoginStore()
const breadcrumbList = computed(() => {
	return userStore.breadcrumbListGet[route.matched[route.matched.length - 1].path]
})

const goto = (val: string): void => {
	userRouter.push(val)
}
</script>
<style lang="scss" scoped>
.link {
	display: flex;
	align-items: center;
	font-size: 16px;

	i {
		font-size: 14px;
		margin-right: 6px;
	}
}
</style>
