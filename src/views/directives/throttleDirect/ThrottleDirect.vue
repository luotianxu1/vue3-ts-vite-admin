<template>
	<div class="card content-box">
		<span class="text">节流指令</span>
		<el-button type="primary" v-throttle="throttleClick">节流按钮 (每隔1S秒后执行)</el-button>
	</div>
</template>

<script setup lang="ts">
import Modal from "@utils/modal"

const throttleClick = () => {
	Modal.msgSuccess("我是节流按钮触发的事件")
}
</script>

<style scoped lang="scss"></style>
