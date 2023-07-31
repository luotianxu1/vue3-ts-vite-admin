export const useSelection = (rowKey: string = "id") => {
	const isSelected = ref<boolean>(false)
	const selectedList = ref<{ [key: string]: any }[]>([])

	/**
	 * @description 多选操作
	 * @param {Array} rowArr 当前选择的所有数据
	 * @return void
	 */
	const selectionChange = (rowArr: { [key: string]: any }[]) => {
		rowArr.length ? (isSelected.value = true) : (isSelected.value = false)
		selectedList.value = rowArr
	}

	// 当前选中的所有 ids 数组
	const selectedListIds = computed((): string[] => {
		return selectedList.value.map(item => item[rowKey])
	})

	return {
		isSelected,
		selectedList,
		selectedListIds,
		selectionChange
	}
}
