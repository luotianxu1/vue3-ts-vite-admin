<template>
	<div class="search">
		<el-form ref="searchFormRef" :label-width="searchConfig.labelWidth ?? '80px'" size="default" :model="searchForm">
			<el-row :gutter="20">
				<template v-for="item in searchConfig.formItems" :key="item.prop">
					<el-col :span="item.span ?? 4">
						<el-form-item :label="item.label" :prop="item.prop">
							<template v-if="item.type === 'input'">
								<el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder"></el-input>
							</template>
							<template v-if="item.type === 'date-picker'">
								<el-date-picker
									v-model="searchForm[item.prop]"
									type="daterange"
									range-separator="到"
									start-placeholder="开始时间"
									end-placeholder="结束时间"
								/>
							</template>
							<template v-if="item.type === 'select'">
								<el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder" style="width: 100%">
									<template v-for="option in item.options" :key="option.value">
										<el-option :label="option.label" :value="option.value"></el-option>
									</template>
								</el-select>
							</template>
						</el-form-item>
					</el-col>
				</template>
			</el-row>
		</el-form>
		<div class="btns">
			<el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
			<el-button type="primary" :icon="Search" @click="handleCommit">查询</el-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Refresh, Search } from "@element-plus/icons-vue"
import type { FormInstance } from "element-plus"

interface IProps {
	searchConfig: {
		formItems: any[]
		labelWidth?: string
	}
}

const emit = defineEmits(["queryClick"])
const props = defineProps<IProps>()

const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
	initialForm[item.prop] = item.initialValue ?? ""
}

const searchFormRef = ref<FormInstance>()
const searchForm = reactive(initialForm)

// 重置
const handleResetClick = () => {
	searchFormRef.value?.resetFields()
}

const handleCommit = () => {
	emit("queryClick", searchForm)
}
</script>

<style lang="scss" scoped>
.search {
	background-color: #ffffff;
	padding: 20px;
}

.btns {
	width: 100%;
	text-align: right;
}
</style>
