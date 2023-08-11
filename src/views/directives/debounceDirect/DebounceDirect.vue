<template>
	<el-button type="primary" v-debounce="debounceClick">防抖按钮 (0.5秒后执行)</el-button>
</template>

<script setup lang="ts">
import Modal from "@utils/modal"

const debounceClick = () => {
	Modal.msgSuccess("我是防抖按钮触发的事件 🍍🍓🍌")
}
</script>

<style scoped lang="scss"></style>
