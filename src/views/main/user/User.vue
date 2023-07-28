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

<script lang="ts" setup name="user">
import { Delete, Edit } from "@element-plus/icons-vue"
import type { IDepartment, IUserInfo } from "@/types"
import type PageContent from "@/components/pageContent/index.vue"

import searchConfig from "./config/searchConfig"
import contentConfig from "./config/contentConfig"
import modalConfig from "./config/modalConfig"

import useModalContent from "@/hooks/usePageModal"
import { UserStore } from "@/stores/modules/user"

import { getUserList } from "@/service/modules/user"
import { getDepartmentList } from "@/service/modules/department"

const userStore = UserStore()
// console.log(userStore.permissionsListGet)

const contentRef = ref<InstanceType<typeof PageContent>>()

// 获取部门列表
let departmentList = ref<IDepartment[]>([])
const queryDepartment = async () => {
	const res = await getDepartmentList({})
	departmentList.value = res.data?.list ?? []
}
queryDepartment()

// 动态向新增弹窗添加值
const modalConfigRef = computed(() => {
	modalConfig.formItems.forEach(item => {
		if (item.prop === "department") {
			item.options = departmentList.value.map(department => {
				return {
					label: department.name,
					value: department.id
				}
			})
		}
	})
	return modalConfig
})

// 获取用户列表
const userList = ref<IUserInfo[]>()
const getList = async (formData = {}) => {
	const res = await getUserList(formData)
	userList.value = res.data?.list
	contentRef.value?.showTable(userList.value)
}
// getList()

// 查询
const handleQueryClick = () => {
	getList()
}

const { userMoadlRef, handleEditBtnClick, handleNewBtnClick } = useModalContent()

const handleDeleteBtnClick = (id: any) => {
	console.log(id)
}
</script>

<style lang="scss" scoped>
.user {
	height: calc(100% - 40px);
	padding: 20px;
	overflow: auto;
}
</style>
