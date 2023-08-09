<template>
	<el-drawer v-model="drawerVisible" title="列设置" size="450px">
		<div class="table-main">
			<div class="table-item table-header">
				<div>列名</div>
				<div>显示</div>
				<div>排序</div>
				<div>固定</div>
			</div>
			<draggable v-model="list" item-key="label" animation="300" chosenClass="chosen" forceFallback="true">
				<template #item="{ element }">
					<div class="table-item">
						<div>
							{{ element.label }}
						</div>
						<div>
							<el-switch v-model="element.isShow"></el-switch>
						</div>
						<div>
							<el-switch v-model="element.sortable"></el-switch>
						</div>
						<div>
							<el-select v-model="element.fixed" placeholder="请选择">
								<el-option v-for="(item, index) in fixedOptions" :key="index" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</div>
					</div>
				</template>
			</draggable>
		</div>
	</el-drawer>
</template>

<script setup lang="ts" name="ColSetting">
import type { ColumnProps } from "@components/proTable/interface"
import draggable from "vuedraggable"

const props = defineProps<{ setting: ColumnProps[] }>()
type EmitProps = {
	(e: "update:setting", val: ColumnProps[]): void
}
const emit = defineEmits<EmitProps>()
const { setting } = toRefs(props)

let list = ref<ColumnProps[]>([])
list.value = setting.value
watch(list, val => {
	emit("update:setting", val)
})

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
.table-main {
	.table-header {
		> div {
			font-weight: 600;
			background-color: var(--el-fill-color-light);
			border-top: 1px solid var(--el-border-color-lighter);
		}
	}

	.table-item {
		display: flex;
		width: 100%;
		height: 50px;
		cursor: all-scroll;
		align-items: center;

		> div {
			display: flex;
			height: 100%;
			padding: 0 12px;
			border-right: 1px solid var(--el-border-color-lighter);
			border-bottom: 1px solid var(--el-border-color-lighter);
			flex: 1;
			align-items: center;
			justify-content: space-around;

			&:nth-child(1) {
				border-left: 1px solid var(--el-border-color-lighter);
			}
		}

		&:hover {
			background-color: var(--el-fill-color-lighter);
		}
	}
}
</style>
