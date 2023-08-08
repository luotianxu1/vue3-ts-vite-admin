<template>
	<el-drawer v-model="drawerVisible" title="列设置" size="450px">
		<div class="table-main">
			<el-table :data="colSetting" :border="true" row-key="prop" default-expand-all :tree-props="{ children: '_children' }">
				<el-table-column prop="label" align="center" label="列名" />
				<el-table-column v-slot="scope" prop="isShow" align="center" label="显示">
					<el-switch v-model="scope.row.isShow"></el-switch>
				</el-table-column>
				<el-table-column v-slot="scope" prop="sortable" align="center" label="排序">
					<el-switch v-model="scope.row.sortable"></el-switch>
				</el-table-column>
				<el-table-column v-slot="scope" prop="fixed" align="center" label="固定" width="110">
					<el-select v-model="scope.row.fixed" placeholder="请选择">
						<el-option v-for="(item, index) in fixedOptions" :key="index" :label="item.label" :value="item.value" />
					</el-select>
				</el-table-column>
				<template #empty>
					<div class="table-empty">
						<div>暂无可配置列</div>
					</div>
				</template>
			</el-table>
		</div>
	</el-drawer>
</template>

<script setup lang="ts" name="ColSetting">
import type { ColumnProps } from "@/components/proTable/interface"

defineProps<{ colSetting: ColumnProps[] }>()

const drawerVisible = ref<boolean>(false)

const openColSetting = () => {
	drawerVisible.value = true
}

const fixedOptions = [
	{
		value: "left",
		label: "左"
	},
	{
		value: "right",
		label: "右"
	},
	{
		value: false,
		label: "不固定"
	}
]

defineExpose({
	openColSetting
})
</script>

<style scoped lang="scss">
.cursor-move {
	cursor: move;
}
</style>
