<template>
	<router-view v-slot="{ Component, route }">
		<transition appear name="fade-transform" mode="out-in">
			<keep-alive :include="keepAliveList">
				<component :is="Component" :key="route.name" v-if="isRefresh" />
			</keep-alive>
		</transition>
	</router-view>
</template>

<script lang="ts" setup>
import eventHub from "@/utils/eventHub"
import { UserStore } from "@/stores/modules/user"

// 获取所有缓存的组件
const userStore = UserStore()
const keepAliveList = ref(userStore.flatMenuListGet.filter(item => item.meta.isKeepAlive).map(item => item.name))

// 刷新页面
const route = useRoute()
const isRefresh = ref(true)
const refreshCurrentPage = () => {
	keepAliveList.value = keepAliveList.value.filter(item => item !== route.name)
	isRefresh.value = false
	setTimeout(() => {
		keepAliveList.value.push(route.name as string)
		isRefresh.value = true
	}, 0)
}
eventHub.on("refresh", () => {
	refreshCurrentPage()
})
</script>

<style scoped lang="scss">
.fade-transform-leave-active,
.fade-transform-enter-active {
	transition: all 0.5s;
}
.fade-transform-enter-from {
	opacity: 0;
	transition: all 0.5s;
	transform: translateX(-30px);
}
.fade-transform-leave-to {
	opacity: 0;
	transition: all 0.5s;
	transform: translateX(30px);
}
</style>
