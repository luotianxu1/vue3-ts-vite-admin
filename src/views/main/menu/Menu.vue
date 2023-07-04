<template>
	<div class="user">
		<PageContent :content-config="contentConfig" ref="contentRef">
			<template #btn="scope">
				<el-button link type="primary" :icon="Edit" @click="handleEditBtn(scope.row)">编辑</el-button>
				<el-button link type="danger" :icon="Delete">删除</el-button>
			</template>
		</PageContent>
	</div>
</template>

<script lang="ts" setup name="userMenu">
import { Delete, Edit } from "@element-plus/icons-vue"
import type PageContent from "@/components/pageContent/index.vue"
import { getUserMenuByRoleId } from "@/service/modules/login"
import type { IMenuOptions } from "@/types"

import contentConfig from "./config/contentConfig"

const contentRef = ref<InstanceType<typeof PageContent>>()

const menuList = ref<IMenuOptions[]>([])
const getMenuList = async () => {
	const res = await getUserMenuByRoleId("0")
	menuList.value = res.data?.menu ?? []
	contentRef.value?.showTable(menuList.value)
}

const handleEditBtn = (data: any) => {
	console.log(data)
}

getMenuList()
</script>

<style lang="scss" scoped>
.user {
	height: calc(100% - 40px);
	padding: 20px;
	overflow: auto;
}
</style>
