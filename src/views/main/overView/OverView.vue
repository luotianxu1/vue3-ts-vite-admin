<template>
	<div class="user">
		<PageSearch :search-config="searchConfig" @query-click="handleQueryClick"></PageSearch>
		<PageContent
			:content-config="contentConfig"
			ref="contentRef"
			@new-btn-click="handleNewBtnClick"
			@edit-btn-click="handleEditBtnClick"
		></PageContent>
		<UserModal ref="userMoadlRef"></UserModal>
	</div>
</template>

<script lang="ts" setup>
import PageContent from "@/components/pageContent/index.vue"
import UserModal from "./components/UserModal.vue"
import searchConfig from "./config/searchConfig"
import contentConfig from "./config/contentConfig"

const contentRef = ref<InstanceType<typeof PageContent>>()
const userMoadlRef = ref<InstanceType<typeof UserModal>>()

const handleQueryClick = (formData: any) => {
	contentRef.value?.getList(formData)
}

const handleNewBtnClick = () => {
	userMoadlRef.value?.setModalVisible()
}

const handleEditBtnClick = (data: any) => {
	userMoadlRef.value?.setModalVisible(false, data)
}
</script>

<style lang="scss" scoped>
.user {
	padding: 20px;
	height: calc(100% - 40px);
	overflow: auto;
}
</style>
