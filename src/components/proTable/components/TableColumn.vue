<template>
	<RenderTableColumn v-bind="column"></RenderTableColumn>
</template>
<script lang="tsx" setup name="TableColumn">
import type { ColumnProps, RenderScope } from "@/components/proTable/interface"
import { filterEnum, formatValue, handleRowAccordingToProp } from "@components/proTable/utils/index"

defineProps<{ column: ColumnProps }>()

const enumMap = inject("enumMap", ref(new Map()))

// 渲染表格数据
const renderCellData = (item: ColumnProps, scope: RenderScope<any>) => {
	return enumMap.value.get(item.prop) && item.isFilterEnum
		? filterEnum(handleRowAccordingToProp(scope.row, item.prop!), enumMap.value.get(item.prop)!, item.fieldNames)
		: formatValue(handleRowAccordingToProp(scope.row, item.prop!))
}

const RenderTableColumn = (item: ColumnProps) => {
	return (
		<>
			{item.isShow && (
				<el-table-column
					{...item}
					align={item.align ?? "center"}
					showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== "operation"}
				>
					{{
						default: (scope: RenderScope<any>) => {
							if (item.render) return item.render(scope)
							return renderCellData(item, scope)
						}
					}}
				</el-table-column>
			)}
		</>
	)
}
</script>
<style lang="scss" scoped></style>
