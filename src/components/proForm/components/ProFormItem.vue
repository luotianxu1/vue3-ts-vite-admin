<template>
	<component
		:is="props.column.form?.render ?? `el-${props.column.form?.el}`"
		v-bind="{ ...handleSearchProps, ...placeholder, formParam: _formParam, clearable }"
		v-model.trim="_formParam[handleProp(props.column.prop!)]"
		:data="props.column.form?.el === 'tree-select' ? columnEnum : []"
		:options="['cascader', 'select-v2'].includes(props.column.form?.el!) ? columnEnum : []"
	>
		<template v-if="props.column.form?.el === 'cascader'" #default="{ data }">
			<span>{{ data[fieldNames.label] }}</span>
		</template>
		<template v-if="props.column.form?.el === 'select'">
			<component
				:is="`el-option`"
				v-for="(col, index) in columnEnum"
				:key="index"
				:label="col[fieldNames.label]"
				:value="col[fieldNames.value]"
			></component>
		</template>
		<slot v-else></slot>
	</component>
</template>

<script lang="ts" setup>
import { ColumnProps } from "@components/proTable/interface"
import { handleProp } from "@components/proTable/utils/index"

interface FormItem {
	column: ColumnProps
	formParam: { [key: string]: any }
}
const props = defineProps<FormItem>()

const _formParam = computed(() => props.formParam)

// 判断 fieldNames 设置 label && value && children 的 key 值
const fieldNames = computed(() => {
	return {
		label: props.column.fieldNames?.label ?? "label",
		value: props.column.fieldNames?.value ?? "value",
		children: props.column.fieldNames?.children ?? "children"
	}
})

// el 为 select-v2 需单独处理 enumData
const columnEnum = computed(() => {
	let enumData = props.column.enum
	if (!enumData) return []
	if (props.column.form?.el === "select-v2" && props.column.fieldNames) {
		enumData = enumData.map((item: { [key: string]: any }) => {
			return { ...item, label: item[fieldNames.value.label], value: item[fieldNames.value.value] }
		})
	}
	return enumData
})

// 处理透传的 searchProps (el 为 tree-select、cascader 的时候需要给下默认 label && value && children)
const handleSearchProps = computed(() => {
	const label = fieldNames.value.label
	const value = fieldNames.value.value
	const children = fieldNames.value.children
	const searchEl = props.column.form?.el
	let searchProps = props.column.form?.props ?? {}
	if (searchEl === "tree-select") {
		searchProps = { ...searchProps, props: { ...searchProps.props, label, children }, nodeKey: value }
	}
	if (searchEl === "cascader") {
		searchProps = { ...searchProps, props: { ...searchProps.props, label, value, children } }
	}
	return searchProps
})

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
	const form = props.column.form
	return form?.props?.clearable ?? null
})

// 处理默认 placeholder
const placeholder = computed(() => {
	const form = props.column.form
	if (["datetimerange", "daterange", "monthrange"].includes(form?.props?.type) || form?.props?.isRange) {
		return { rangeSeparator: "至", startPlaceholder: "开始时间", endPlaceholder: "结束时间" }
	}
	const placeholder = form?.props?.placeholder ?? (form?.el?.includes("input") ? "请输入" : "请选择")
	return { placeholder }
})
</script>

<style lang="scss" scoped></style>
