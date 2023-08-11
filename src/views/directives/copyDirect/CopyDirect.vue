<template>
	<el-input placeholder="请输入内容" v-model="data" style="width: 500px">
		<template #append>
			<el-button v-copy="data">复制</el-button>
		</template>
	</el-input>
</template>

<script setup lang="ts">
const data = ref<string>("我是被复制的内容")
</script>

<style scoped lang="scss"></style>
