<template>
	<div class="card content-box">
		<WangEditor height="400px" v-model:value="content" />
		<el-button type="primary" @click="dialogVisible = true">内容预览</el-button>

		<el-dialog v-model="dialogVisible" title="富文本内容预览" width="1300px" top="50px">
			<div class="view" v-html="content"></div>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="wangEditor">
import { ref } from "vue"

const content = ref("")

const dialogVisible = ref(false)
</script>

<style scoped lang="scss">
.card {
	margin: 10px;
}

.el-button {
	margin-top: 20px;
}

:deep(.el-dialog__body) {
	height: 700px !important;
	overflow: auto;
}
</style>
