v
<template>
	<div class="content">
		<div class="header">
			<h3 class="title">{{ contentConfig?.header?.title ?? "数据列表" }}</h3>
			<el-button type="primary" @click="handleAddBtnClick">新建用户</el-button>
		</div>
		<div class="table">
			<el-table :data="data" :border="true" row-key="path" v-bind="contentConfig.childrenTree">
				<template v-for="item in contentConfig.propsList" :key="item.prop">
					<template v-if="item.type === 'timer'">
						<el-table-column align="center" v-bind="item">
							<template #default="scope">
								{{ scope.row[item.prop] }}
							</template>
						</el-table-column>
					</template>
					<template v-else-if="item.type === 'custom'">
						<el-table-column align="center" v-bind="item">
							<template #default="scope">
								<slot :name="item.sloatName" v-bind="scope"></slot>
							</template>
						</el-table-column>
					</template>
					<template v-else>
						<el-table-column align="center" v-bind="item"></el-table-column>
					</template>
				</template>
			</el-table>
		</div>
		<div class="pagination">
			<el-pagination
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				:page-sizes="[10, 20, 30, 40]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="400"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface IProps {
	contentConfig: {
		header?: {
			title?: string
		}
		propsList: any[]
		childrenTree?: any
	}
}

const emit = defineEmits(["newBtnClick", "editBtnClick"])
const props = defineProps<IProps>()

const currentPage = ref(1)
const pageSize = ref(20)

const data = ref<any>()
const showTable = (formData: any) => {
	data.value = formData
}

const handleAddBtnClick = () => {
	emit("newBtnClick")
}

defineExpose({ showTable })
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}

.title {
	font-size: 22px;
}
</style>
