<template>
	<RenderTableColumn v-bind="column"></RenderTableColumn>
</template>
<script lang="tsx" setup name="TableColumn">
import type { ColumnProps } from "@/components/proTable/interface"

defineProps<{ column: ColumnProps }>()

const RenderTableColumn = (item: ColumnProps) => {
	return (
		<>
			{item.isShow && (
				<el-table-column
					{...item}
					align={item.align ?? "center"}
					showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== "operation"}
				></el-table-column>
			)}
		</>
	)
}
</script>
<style lang="scss" scoped></style>
