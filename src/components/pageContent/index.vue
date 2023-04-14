v
<template>
	<div class="content">
		<div class="header">
			<h3 class="title">{{ contentConfig?.header?.title ?? "数据列表" }}</h3>
			<el-button type="primary" @click="handleAddBtnClick">新建用户</el-button>
		</div>
		<div class="table">
			<el-table :data="userList" :border="true">
				<el-table-column align="center" type="selection" width="40"></el-table-column>
				<el-table-column align="center" label="序号" type="index" width="55"></el-table-column>
				<el-table-column align="center" label="用户名" prop="name" width="80"></el-table-column>
				<el-table-column align="center" label="年龄" prop="age" width="55"></el-table-column>
				<el-table-column align="center" label="手机号" prop="phone" width="120"></el-table-column>
				<el-table-column align="center" label="邮箱" prop="email" width="180"></el-table-column>
				<el-table-column align="center" label="城市" prop="city"></el-table-column>
				<el-table-column align="center" label="状态" prop="status" width="100">
					<template #default="scoped">
						<el-tag :type="scoped.row.status ? 'success' : 'danger'">{{ scoped.row.status ? "启用" : "禁用" }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column align="center" label="添加时间" prop="addTime"></el-table-column>
				<el-table-column align="center" label="修改时间" prop="editTime"></el-table-column>
				<el-table-column align="center" label="操作" width="160">
					<template #default="scoped">
						<el-button link type="primary" :icon="Edit" @click="handleEditBtnClick(scoped.row)">编辑</el-button>
						<el-button link type="danger" :icon="Delete" @click="handleDeleteBtnClick(scoped.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination">
			<el-pagination
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				:page-sizes="[10, 20, 30, 40]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="400"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Delete, Edit } from "@element-plus/icons-vue"
import type { IUserInfo } from "@/types"
import { getuserList } from "@/service/modules/user"

interface IProps {
	contentConfig: {
		header?: {
			title?: string
		}
		propsList: any[]
	}
}

const emit = defineEmits(["newBtnClick", "editBtnClick"])
const props = defineProps<IProps>()

onMounted(() => {
	getList()
})

const currentPage = ref(1)
const pageSize = ref(20)
const handleSizeChange = () => {
	getList()
}
const handleCurrentChange = () => {
	getList()
}

const userList = ref<IUserInfo[]>()
const getList = async (formData = {}) => {
	const size = pageSize.value
	const offset = (currentPage.value - 1) * size
	const pageInfo = { size, offset }
	const queryInfo = { ...pageInfo, ...formData }
	const res = await getuserList(queryInfo)
	userList.value = res.data?.list
}

const handleDeleteBtnClick = (id: any) => {
	console.log(id)
}

const handleAddBtnClick = () => {
	emit("newBtnClick")
}

const handleEditBtnClick = (data: any) => {
	emit("editBtnClick", data)
}

defineExpose({ getList })
</script>

<style lang="scss" scoped>
.content {
	padding: 20px;
	background-color: #fff;
	margin-top: 20px;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}

.title {
	font-size: 22px;
}
</style>
