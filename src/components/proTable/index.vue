<template>
	<div class="proTable">
		<SearchForm
			v-show="isShowSearch"
			:search="search"
			:reset="reset"
			:columns="searchColumns"
			:search-param="searchParam"
			:search-col="searchCol"
		></SearchForm>
		<div class="card table">
			<div class="table-header">
				<div class="table-header-left">
					<slot name="tableHeader" :selected-list-ids="selectedListIds" :selected-list="selectedList" :is-selected="isSelected">
					</slot>
				</div>
				<div class="table-header-right" v-if="toolButton">
					<slot name="toolButton">
						<el-button :icon="Refresh" circle @click="getTableList" />
						<el-button :icon="Operation" circle @click="openColSetting" />
						<el-button :icon="Search" circle @click="isShowSearch = !isShowSearch" />
					</slot>
				</div>
			</div>
			<div class="table-main">
				<el-table
					ref="tableRef"
					stripe
					:data="data ?? tableData"
					:border="border"
					:row-key="rowKey"
					@selection-change="selectionChange"
				>
					<slot></slot>
					<template v-for="item in tableColumns" :key="item">
						<el-table-column
							v-if="item.type && ['selection', 'index'].includes(item.type)"
							v-bind="item"
							:align="item.align ?? 'center'"
							:reserve-selection="item.type == 'selection'"
						>
						</el-table-column>
						<TableColumn v-if="!item.type && item.prop && item.isShow" :column="item">
							<template v-for="slot in Object.keys($slots)" #[slot]="scope">
								<slot :name="slot" v-bind="scope"></slot>
							</template>
						</TableColumn>
					</template>
					<template #append>
						<slot name="append"> </slot>
					</template>
					<template #empty>
						<div class="table-empty">
							<slot name="empty">
								<el-empty description="暂无数据" />
							</slot>
						</div>
					</template>
				</el-table>
			</div>
			<div class="table-page">
				<Pagination
					v-if="pagination"
					:pageable="pageable"
					:handle-size-change="handleSizeChange"
					:handle-current-change="handleCurrentChange"
				></Pagination>
			</div>
		</div>
	</div>

	<ColSetting ref="colSettingRef" v-if="toolButton" v-model:setting="colSetting" />
	<FormDialog ref="formDialogRef" :title="title" :columns="formColumns" :formParam="formParam"></FormDialog>
</template>

<script lang="ts" setup name="ProTable">
import SearchForm from "@components/searchForm/index.vue"
import FormDialog from "@components/proTable/components/FormDialog.vue"
import { Refresh, Operation, Search } from "@element-plus/icons-vue"
import Pagination from "@components/proTable/components/Pagination.vue"
import ColSetting from "@components/proTable/components/ColSetting.vue"
import TableColumn from "@components/proTable/components/TableColumn.vue"
import { useSelection } from "@hooks/useSelection"
import { useTable } from "@hooks/useTable"
import { handleProp } from "./utils"
import type { ElTable } from "element-plus"
import type { ColumnProps } from "@components/proTable/interface"
import type { BreakPoint } from "@components/grid/interface"

export interface ProTableProps {
	columns: ColumnProps[] // 列配置项  ==> 必传
	data?: any[] // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
	requestApi?: (params: any) => Promise<any> // 请求表格数据的 api ==> 非必传
	requestAuto?: boolean // 是否自动执行请求 api ==> 非必传（默认为true）
	title?: string // 表格标题，目前只在打印的时候用到 ==> 非必传
	pagination?: boolean // 是否需要分页组件 ==> 非必传（默认为true）
	toolButton?: boolean // 是否显示表格功能按钮 ==> 非必传（默认为true）
	initParam?: any // 初始化请求参数 ==> 非必传（默认为{}）
	border?: boolean // 是否带有纵向边框 ==> 非必传（默认为true）
	rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
	searchCol?: number | Record<BreakPoint, number> // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 6 }
}
const props = withDefaults(defineProps<ProTableProps>(), {
	columns: () => [],
	requestAuto: true,
	pagination: true,
	toolButton: true,
	initParam: {},
	border: true,
	rowKey: "id",
	searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 6 })
})

// 是否显示搜索模块
const isShowSearch = ref(true)

// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>()

// 表格多选 Hooks
const { isSelected, selectedList, selectedListIds, selectionChange } = useSelection(props.rowKey)

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection()

// 表格操作 Hooks
const { tableData, pageable, searchParam, searchInitParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
	useTable(props.requestApi, props.initParam, props.pagination)

// 初始化请求
onMounted(() => props.requestAuto && getTableList())

// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true })

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns)

const setEnumMap = async (col: ColumnProps) => {
	if (!col.enumApi) return
	const { data } = await col.enumApi()
	col.enum = data
}

// 扁平化 columns
const flatColumns = ref<ColumnProps[]>()
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
	columns.forEach(async col => {
		if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children))
		flatArr.push(col)

		// 给每一项 column 添加 isShow && isFilterEnum 默认属性
		col.isShow = col.isShow ?? true
		col.isFilterEnum = col.isFilterEnum ?? true
		col.fixed = col.fixed ?? false

		// 设置 enumMap
		setEnumMap(col)
	})
	return flatArr.filter(item => !item._children?.length)
}
flatColumns.value = flatColumnsFunc(tableColumns.value)

// 列设置 ==> 过滤掉不需要设置的列
let colSetting = ref([])
const colSettingRef = ref<InstanceType<typeof ColSetting>>()
colSetting.value = tableColumns.value!.filter(
	item => !["selection", "index"].includes(item.type!) && item.prop !== "operation" && item.isShow
)
watch(colSetting, val => {
	let header = tableColumns.value.filter(item => ["selection", "index"].includes(item.type))
	let operation = tableColumns.value.filter(item => item.prop === "operation")
	tableColumns.value = [...header, ...val, ...operation]
})
const openColSetting = () => colSettingRef.value!.openColSetting()

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter(item => item.search?.el || item.search?.render)
// 设置搜索表单排序默认值 && 设置搜索表单项的默认值
searchColumns.forEach((column, index) => {
	column.search!.order = column.search!.order ?? index + 2
	if (column.search?.defaultValue !== undefined && column.search?.defaultValue !== null) {
		searchInitParam.value[column.search.key ?? handleProp(column.prop!)] = column.search?.defaultValue
		searchParam.value[column.search.key ?? handleProp(column.prop!)] = column.search?.defaultValue
	}
})
// 排序搜索表单项
searchColumns.sort((a, b) => a.search!.order! - b.search!.order!)

// 表单
const formDialogRef = ref<InstanceType<typeof FormDialog>>()
const formParam = ref([])
const formColumns = flatColumns.value.filter(item => item.form?.el || item.form?.render)
formColumns.forEach(column => {
	formParam.value[handleProp(column.prop!)] = null
})
formColumns.sort((a, b) => a.form!.order! - b.form!.order!)

const setDialogVisible = val => {
	formDialogRef.value.setVisible(val)
}

// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
	element: tableRef,
	tableData,
	pageable,
	searchParam,
	searchInitParam,
	getTableList,
	search,
	reset,
	handleSizeChange,
	handleCurrentChange,
	clearSelection,
	isSelected,
	selectedList,
	selectedListIds,
	setDialogVisible
})
</script>
<style lang="scss" scoped>
.proTable {
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;

	.table {
		display: flex;
		flex-direction: column;
		flex: 1;

		.table-header {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.el-button {
				margin-bottom: 15px;
			}
		}

		.table-main {
			display: flex;
			overflow: hidden;
			flex: 1;

			.el-table {
				width: 100%;
				height: 100%;
			}
		}

		.table-page {
			display: flex;
			margin-top: 15px;
			align-items: center;
			justify-content: flex-end;
		}
	}
}
</style>
