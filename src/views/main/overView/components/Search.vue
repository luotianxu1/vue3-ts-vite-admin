<template>
	<div class="search">
		<el-form ref="searchFormRef" label-width="80px" size="default" :model="searchForm">
			<el-row :gutter="20">
				<el-col :span="8">
					<el-form-item label="用户名" prop="name">
						<el-input placeholder="请输入用户名" v-model="searchForm.name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="真实姓名" prop="realname">
						<el-input placeholder="请输入真实姓名" v-model="searchForm.realname"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="电话号码" prop="callphone">
						<el-input placeholder="请输入电话号码" v-model="searchForm.callphone"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="状态" prop="enable">
						<el-select placeholder="请选择查询状态" style="width: 100%" v-model="searchForm.enable">
							<el-option label="启用" :value="1"></el-option>
							<el-option label="禁用" :value="0"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="时间" prop="create">
						<el-date-picker
							v-model="searchForm.create"
							type="daterange"
							range-separator="到"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
						/>
					</el-form-item>
				</el-col>
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

const emit = defineEmits(["queryClick"])

const searchFormRef = ref<FormInstance>()
const searchForm = reactive({
	name: "",
	realname: "",
	callphone: "",
	enable: 1,
	create: ""
})

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
