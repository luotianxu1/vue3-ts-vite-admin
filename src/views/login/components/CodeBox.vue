<template>
	<div class="code-box">19gt</div>
</template>

<script lang="ts" setup>
const checkBox = (val: string): boolean => {
	return val === "19gt"
}

defineExpose({
	checkBox
})
</script>

<style lang="scss" scoped>
.code-box {
	width: 100px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	background-color: rgba(249, 249, 249, 1);
	border: 1px solid rgba(228, 228, 228, 1);
	border-radius: 5px;
	margin-left: 8px;
	font-size: 28px;
	color: #464c5b;
}
</style>
