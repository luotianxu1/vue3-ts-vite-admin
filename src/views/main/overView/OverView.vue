<template>
	<div class="user">
		<Search @query-click="handleQueryClick"></Search>
		<Content ref="contentRef" @new-btn-click="handleNewBtnClick" @edit-btn-click="handleEditBtnClick"></Content>
		<UserModal ref="userMoadlRef"></UserModal>
	</div>
</template>

<script lang="ts" setup>
import Search from "./components/Search.vue"
import Content from "./components/Content.vue"
import UserModal from "./components/UserModal.vue"

const contentRef = ref<InstanceType<typeof Content>>()
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
