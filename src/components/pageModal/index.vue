<template>
	<el-dialog
		v-model="dialogVisible"
		:title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
		width="30%"
		center
	>
		<div class="form">
			<el-form :model="formData" label-width="100px">
				<template v-for="item in modalConfig.formItems" :key="item.prop">
					<el-form-item :label="item.label" :prop="item.prop">
						<template v-if="item.type === 'input'">
							<el-input v-model="formData[item.prop]" :placeholder="item.placeholder"></el-input>
						</template>
						<template v-if="item.type === 'date-picker'">
							<el-date-picker
								v-model="formData[item.prop]"
								type="daterange"
								range-separator="到"
								start-placeholder="开始时间"
								end-placeholder="结束时间"
							/>
						</template>
						<template v-if="item.type === 'select'">
							<el-select v-model="formData[item.prop]" :placeholder="item.placeholder" style="width: 100%">
								<template v-for="option in item.options" :key="option.value">
									<el-option :label="option.label" :value="option.value"></el-option>
								</template>
							</el-select>
						</template>
					</el-form-item>
				</template>
			</el-form>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="submit"> 确定 </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
interface IModalProps {
	modalConfig: {
		header: {
			newTitle: string
			editTitle: string
		}
		formItems: any[]
	}
}

const props = defineProps<IModalProps>()

const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
	initialForm[item.prop] = ""
}

const dialogVisible = ref(false)
const isNewRef = ref(false)
const formData = reactive(initialForm)

const setModalVisible = (isNew: boolean = true, itemData?: any) => {
	dialogVisible.value = true
	isNewRef.value = isNew
	if (!isNew && itemData) {
		for (const key in formData) {
			formData[key] = itemData[key]
		}
	} else {
		for (const key in formData) {
			const item = props.modalConfig.formItems.find(item => item.prop === key)
			formData[key] = item ? item.initialValue : ""
		}
	}
}

const submit = () => {
	dialogVisible.value = false
}

defineExpose({ setModalVisible })
</script>

<style lang="scss" scoped>
.form {
	padding: 0 20px;
}
</style>
