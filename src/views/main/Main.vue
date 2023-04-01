<template>
	<div><el-button @click="logout">退出登陆</el-button></div>

	{{ userInfo }}
</template>

<script lang="ts" setup>
import { LOGIN_TOKEN } from "@/global/constants"
import useLoginStore from "@/stores/login/login"
import { localCache } from "@/utils/cache"

const router = useRouter()
const logout = () => {
	// 删除token
	localCache.removeCache(LOGIN_TOKEN)
	// 跳回登陆页面
	router.push("/login")
}

const loginStore = useLoginStore()
const userInfo = loginStore.token
</script>

<style lang="scss" scoped></style>
