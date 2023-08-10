<template>
	<div class="user">
		<TreeFilter
			label="name"
			title="部门列表(单选)"
			:request-api="getDepartmentList"
			:default-value="initParam.departmentId"
			@change="changeTreeFilter"
		/>
		<div class="table-box">
			<ProTable ref="proTableRef" title="用户" :columns="columns" :request-api="getTableList" :init-param="initParam">
				<template #tableHeader="scope">
					<el-button type="primary" :icon="CirclePlus" @click="proTableRef.setDialogVisible(true)"> 新增用户 </el-button>
					<el-button type="primary" :icon="Upload" plain> 批量添加用户 </el-button>
					<el-button type="primary" :icon="Download" plain> 导出用户数据 </el-button>
					<el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected"> 批量删除用户 </el-button>
				</template>
				<template #nameHeader="scope">
					<el-button type="primary">
						{{ scope.column.label }}
					</el-button>
				</template>
				<template #append>
					<span style="color: var(--el-color-primary)">我是插入在表格最后的内容。若表格有合计行，该内容会位于合计行之上。</span>
				</template>
				<template #operation>
					<el-button type="primary" link> 查看 </el-button>
					<el-button type="primary" link> 编辑 </el-button>
					<el-button type="primary" link> 重置密码 </el-button>
					<el-button type="primary" link> 删除 </el-button>
				</template>
			</ProTable>
		</div>
	</div>
</template>

<script lang="tsx" setup name="user">
import { CirclePlus, Delete, Download, Upload } from "@element-plus/icons-vue"
import { getUserGender, getUserList } from "@service/modules/user"
import { getDepartmentList } from "@service/modules/department"
import type { ColumnProps, ProTableInstance } from "@components/proTable/interface"

const getTableList = (formData = {}) => {
	return getUserList(formData)
}

const proTableRef = ref<ProTableInstance>()

const initParam = reactive({ departmentId: "1" })

// 树形筛选切换
const changeTreeFilter = (val: string) => {
	proTableRef.value!.pageable.pageNum = 1
	initParam.departmentId = val
}

// 表格配置项
const columns: ColumnProps<any>[] = [
	{ type: "selection", fixed: "left", width: 50 },
	{ type: "index", label: "#", fixed: "left", width: 50 },
	{ prop: "name", label: "用户名", width: 100, search: { el: "input" }, form: { el: "input" } },
	{
		prop: "base",
		label: "基本信息",
		_children: [
			{
				prop: "gender",
				label: "性别",
				width: 70,
				enum: getUserGender,
				fieldNames: { label: "genderLabel", value: "genderValue" },
				search: { el: "select", props: { filterable: true } },
				form: { el: "select", props: { filterable: true } }
			},
			{
				prop: "age",
				label: "年龄",
				width: 70,
				search: {
					// 自定义 search 显示内容
					render: ({ searchParam }) => {
						return <el-input-number v-model={searchParam.age} placeholder="请输入" />
					}
				},
				form: {
					// 自定义 form 显示内容
					render: ({ formParam }) => {
						return <el-input-number v-model={formParam.age} placeholder="请输入" />
					}
				}
			},
			{ prop: "phone", label: "手机号", width: 150, search: { el: "input" }, form: { el: "input" } },
			{ prop: "email", label: "邮箱", width: 300, form: { el: "input" } }
		]
	},
	{
		prop: "status",
		label: "状态",
		width: 140,
		enum: [
			{ statusLabel: "启用", statusValue: 1 },
			{ statusLabel: "禁用", statusValue: 0 }
		],
		fieldNames: {
			label: "statusLabel",
			value: "statusValue"
		},
		search: { el: "select", props: { filterable: true } },
		render: scope => {
			return (
				<el-switch
					model-value={scope.row.status}
					active-text={scope.row.status ? "启用" : "禁用"}
					active-value={1}
					inactive-value={0}
				/>
			)
		},
		form: {
			render: ({ formParam }) => {
				return (
					<el-switch
						model-value={formParam.status}
						active-text={formParam.status ? "启用" : "禁用"}
						active-value={1}
						inactive-value={0}
					/>
				)
			}
		}
	},
	{
		prop: "type",
		label: "角色",
		width: 120,
		enum: [
			{ statusLabel: "超级管理员", statusValue: 0 },
			{ statusLabel: "管理员", statusValue: 1 },
			{ statusLabel: "用户", statusValue: 2 }
		],
		fieldNames: {
			label: "statusLabel",
			value: "statusValue"
		},
		render: scope => {
			return (
				<el-tag type={scope.row.type === 0 ? "danger" : scope.row.type === 1 ? "success" : "info"}>
					{scope.row.type === 0 ? "超级管理员" : scope.row.type === 1 ? "管理员" : "用户"}
				</el-tag>
			)
		},
		headerRender: scope => {
			return <el-button type="primary">{scope.column.label}</el-button>
		},
		search: { el: "select", props: { filterable: true } },
		form: { el: "select", props: { filterable: true } }
	},
	{
		prop: "createTime",
		label: "添加时间",
		width: 180,
		search: {
			el: "date-picker",
			span: 2,
			props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
			defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"]
		}
	},
	{ prop: "editTime", label: "修改时间", width: 180 },
	{ prop: "operation", label: "操作", fixed: "right", width: 230 }
]
</script>

<style lang="scss" scoped>
.user {
	display: flex;
	width: 100%;
	height: 100%;
	padding: 15px;

	.table-box {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
	}
}
</style>
