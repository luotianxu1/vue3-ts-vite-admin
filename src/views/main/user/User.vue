<template>
	<div class="user">
		<PageSearch :search-config="searchConfig" @query-click="handleQueryClick"></PageSearch>
		<PageContent :content-config="contentConfig" ref="contentRef" @new-btn-click="handleNewBtnClick">
			<template #status="scope">
				<el-tag :type="scope.row.status ? 'success' : 'danger'">{{ scope.row.status ? "启用" : "禁用" }}</el-tag>
			</template>
			<template #btn="scope">
				<el-button link type="primary" :icon="Edit" @click="handleEditBtnClick(scope.row)">编辑</el-button>
				<el-button link type="danger" :icon="Delete" @click="handleDeleteBtnClick(scope.row.id)">删除</el-button>
			</template>
		</PageContent>
		<PageModal :modal-config="modalConfigRef" ref="userMoadlRef"></PageModal>
	</div>
</template>

<script lang="ts" setup>
import { Delete, Edit } from "@element-plus/icons-vue"

import searchConfig from "./config/searchConfig"
import contentConfig from "./config/contentConfig"
import modalConfig from "./config/modalConfig"

import usePageContent from "@/hooks/usePageContent"
import useModalContent from "@/hooks/usePageModal"

const modalConfigRef = computed(() => {
	return modalConfig
})

const { contentRef, handleQueryClick } = usePageContent()

const { userMoadlRef, handleEditBtnClick, handleNewBtnClick } = useModalContent()

const handleDeleteBtnClick = (id: any) => {
	console.log(id)
}
</script>

<style lang="scss" scoped>
.user {
	padding: 20px;
	height: calc(100% - 40px);
	overflow: auto;
}
</style>
