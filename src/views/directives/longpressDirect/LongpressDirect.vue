<template>
	<div class="card content-box">
		<span class="text">长按指令</span>
		<el-button type="primary" v-longpress="longpress">长按2秒触发事件</el-button>
	</div>
</template>

<script setup lang="ts">
import Modal from "@utils/modal"

const longpress = () => {
	Modal.msgSuccess("长按事件触发成功")
}
</script>

<style scoped lang="scss"></style>
