<template>
	<RenderTableColumn v-bind="column"></RenderTableColumn>
</template>
<script lang="tsx" setup name="TableColumn">
import type { ColumnProps, HeaderRenderScope, RenderScope } from "@components/proTable/interface"
import { filterEnum, formatValue, handleProp, handleRowAccordingToProp } from "@components/proTable/utils/index"

defineProps<{ column: ColumnProps }>()

const slots = useSlots()

// 渲染表格数据
const renderCellData = (item: ColumnProps, scope: RenderScope<any>) => {
	return item.isFilterEnum
		? filterEnum(handleRowAccordingToProp(scope.row, item.prop!), item.enum, item.fieldNames)
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
							if (item._children) return item._children.map(child => RenderTableColumn(child))
							if (item.render) return item.render(scope)
							if (slots[handleProp(item.prop!)]) return slots[handleProp(item.prop!)]!(scope)
							return renderCellData(item, scope)
						},
						header: (scope: HeaderRenderScope<any>) => {
							if (item.headerRender) return item.headerRender(scope)
							if (slots[`${handleProp(item.prop!)}Header`]) return slots[`${handleProp(item.prop!)}Header`]!(scope)
							return item.label
						}
					}}
				</el-table-column>
			)}
		</>
	)
}
</script>
<style lang="scss" scoped></style>
