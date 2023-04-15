import type PageModal from "@/components/pageModal/index.vue"

const useModalContent = () => {
	const userMoadlRef = ref<InstanceType<typeof PageModal>>()

	// 新增弹窗
	const handleNewBtnClick = () => {
		userMoadlRef.value?.setModalVisible()
	}

	// 修改弹窗
	const handleEditBtnClick = (data: any) => {
		userMoadlRef.value?.setModalVisible(false, data)
	}

	return {
		userMoadlRef,
		handleEditBtnClick,
		handleNewBtnClick
	}
}

export default useModalContent
