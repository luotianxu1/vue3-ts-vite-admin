<template>
	<div class="user">
		<ProTable ref="proTable" title="用户列表" :columns="columns" :request-api="getTableList">
			<template #tableHeader="scope">
				<el-button type="primary" :icon="CirclePlus"> 新增用户 </el-button>
				<el-button type="primary" :icon="Upload" plain> 批量添加用户 </el-button>
				<el-button type="primary" :icon="Download" plain> 导出用户数据 </el-button>
				<el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected"> 批量删除用户 </el-button>
			</template>
			<template #append>
				<span style="color: var(--el-color-primary)">我是插入在表格最后的内容。若表格有合计行，该内容会位于合计行之上。</span>
			</template>
			<template #operation>
				<el-button type="primary" link :icon="View"> 查看 </el-button>
				<el-button type="primary" link :icon="EditPen"> 编辑 </el-button>
				<el-button type="primary" link :icon="Refresh"> 重置密码 </el-button>
				<el-button type="primary" link :icon="Delete"> 删除 </el-button>
			</template>
		</ProTable>
	</div>
</template>

<script lang="ts" setup name="user">
import { CirclePlus, Delete, Download, Upload, View, EditPen, Refresh } from "@element-plus/icons-vue"
import { getUserGender, getUserList } from "@/service/modules/user"
import type { ColumnProps } from "@/components/proTable/interface"

const getTableList = (formData = {}) => {
	return getUserList(formData)
}

// 表格配置项
const columns: ColumnProps<any>[] = [
	{ type: "selection", fixed: "left", width: 80 },
	{ type: "index", label: "#", width: 80 },
	{ prop: "name", label: "用户名" },
	{ prop: "gender", label: "性别", enum: getUserGender, fieldNames: { label: "genderLabel", value: "genderValue" } },
	{ prop: "age", label: "年龄" },
	{ prop: "phone", label: "手机号" },
	{ prop: "email", label: "邮箱" },
	{
		prop: "status",
		label: "状态",
		enum: [
			{ statusLabel: "启用", statusValue: 1 },
			{ statusLabel: "禁用", statusValue: 0 }
		],
		fieldNames: {
			label: "statusLabel",
			value: "statusValue"
		}
	},
	{ prop: "createTime", label: "添加时间" },
	{ prop: "editTime", label: "修改时间" },
	{ prop: "operation", label: "操作", fixed: "right", width: 330 }
]
</script>

<style lang="scss" scoped>
.user {
	display: flex;
	width: 100%;
	height: 100%;
	padding: 15px;
	flex-direction: column;
}
</style>
