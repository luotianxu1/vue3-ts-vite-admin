<template>
	<el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
		<div class="form">
			<el-form :model="formData" label-width="100px">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="formData.name"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="formData.password"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
const dialogVisible = ref(false)
const formData = reactive<any>({
	name: "",
	password: ""
})
const isNewRef = ref(false)

const setModalVisible = (isNew: boolean = true, itemData?: any) => {
	dialogVisible.value = true
	isNewRef.value = isNew
	if (!isNew && itemData) {
		for (const key in formData) {
			formData[key] = itemData[key]
		}
	} else {
		for (const key in formData) {
			formData[key] = ""
		}
	}
}

defineExpose({ setModalVisible })
</script>

<style lang="scss" scoped>
.form {
	padding: 0 20px;
}
</style>
