<template>
	<div class="user">
		<ProTable
			ref="proTableRef"
			title="用户列表"
			:columns="columns"
			:request-api="getUserMenuByRoleId"
			:init-param="initParam"
			:pagination="false"
			row-key="path"
		>
			<template #operation>
				<el-button type="primary" link> 新增 </el-button>
				<el-button type="primary" link> 查看 </el-button>
				<el-button type="primary" link> 编辑 </el-button>
				<el-button type="primary" link> 删除 </el-button>
			</template>
		</ProTable>
	</div>
</template>

<script lang="tsx" setup name="userMenu">
import { ColumnProps } from "@/components/proTable/interface"
import { getUserMenuByRoleId } from "@service/modules/login"

const initParam = reactive({ userId: "1" })

// 表格配置项
const columns: ColumnProps<any>[] = [
	{ type: "index", label: "#", fixed: "left", width: 50 },
	{
		prop: "meta.title",
		label: "名称",
		width: 180,
		render: scope => {
			const title = scope.row.meta ? scope.row.meta.title : scope.row.title
			return <text>{title}</text>
		},
		search: { el: "input" }
	},
	{
		prop: "path",
		label: "路由地址",
		render: scope => {
			return scope.row.component ? <router-link to={scope.row.path}>{scope.row.path}</router-link> : "--"
		}
	},
	{
		prop: "component",
		label: "组件地址"
	},
	{
		prop: "meta.icon",
		label: "图标",
		width: 80,
		render: scope => {
			return scope.row.meta ? <i class={"iconfont " + scope.row.meta?.icon}></i> : "--"
		}
	},
	{
		prop: "meta.icon",
		label: "图标",
		width: 110,
		render: scope => {
			return (
				<el-tag type={scope.row.component ? "success" : scope.row.path ? "warning" : "danger"}>
					{scope.row.component ? "页面" : scope.row.path ? "模块名称" : "按钮权限"}
				</el-tag>
			)
		}
	},
	{
		prop: "meta.isFull",
		label: "全屏",
		width: 100,
		render: scope => {
			return scope.row.path && scope.row.component ? <el-switch model-value={scope.row.meta.isFull} /> : "--"
		}
	},
	{
		prop: "meta.isHide",
		label: "隐藏菜单",
		width: 100,
		render: scope => {
			return scope.row.meta ? <el-switch model-value={scope.row.meta.isHide} /> : "--"
		}
	},
	{
		prop: "meta.isKeepAlive",
		label: "持久化",
		width: 100,
		render: scope => {
			return scope.row.path && scope.row.component ? <el-switch model-value={scope.row.meta.isKeepAlive} /> : "--"
		}
	},
	{ prop: "permission", label: "权限" },
	{ prop: "operation", label: "操作", fixed: "right", width: 200 }
]
</script>

<style lang="scss" scoped>
.user {
	width: 100%;
	height: 100%;
	padding: 15px;
}
</style>
