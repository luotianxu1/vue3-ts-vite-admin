<template>
	<el-dialog v-model="dialogVisible" :title="title" width="30%" @close="clearForm">
		<ProForm ref="proFormRef" :columns="columns" :formParam="formParam"></ProForm>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog">取消</el-button>
				<el-button type="primary" @click="submit"> 确定 </el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script lang="ts" setup>
import ProForm from "@components/proForm/index.vue"
import type { ColumnProps } from "@components/proTable/interface"

export interface FormDialogeProps {
	title?: string
	columns?: ColumnProps[] // 搜索配置列
	formParam?: { [key: string]: any } // 搜索参数
}
withDefaults(defineProps<FormDialogeProps>(), {
	title: "",
	columns: () => [],
	formParam: () => ({})
})

const dialogVisible = ref(false)
const proFormRef = ref<InstanceType<typeof ProForm>>()

// 设置弹窗状态
const setVisible = val => {
	dialogVisible.value = val
}

// 提交表单
const submit = () => {
	closeDialog()
}

// 清空表单
const clearForm = () => {
	proFormRef.value.clearFormData()
}

// 关闭弹窗
const closeDialog = () => {
	setVisible(false)
}

defineExpose({ setVisible })
</script>
<style lang="scss" scoped></style>
