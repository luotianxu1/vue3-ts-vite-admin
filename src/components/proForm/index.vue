<template>
	<el-form ref="formRef" :model="params" :label-width="labelWidth">
		<template v-for="item in columns" :key="item.prop">
			<el-form-item :label="`${item.label} :`">
				<ProFormItem :column="item" :form-param="params"></ProFormItem>
			</el-form-item>
		</template>
	</el-form>
</template>

<script lang="ts" setup name="ProTable">
import ProFormItem from "./components/ProFormItem.vue"
import type { ColumnProps } from "@components/proTable/interface"

export interface ProFormProps {
	labelWidth?: string
	columns?: ColumnProps[] // 搜索配置列
	formParam?: { [key: string]: any } // 搜索参数
}
const props = withDefaults(defineProps<ProFormProps>(), {
	labelWidth: "120px",
	columns: () => [],
	formParam: () => ({})
})

const params = ref({})
watch(
	() => props.formParam,
	val => {
		params.value = val
	},
	{
		immediate: true
	}
)

const clearFormData = () => {
	Object.keys(params.value).forEach(item => {
		params.value[item] = null
	})
}
defineExpose({ clearFormData })
</script>

<style lang="scss" scoped></style>
