<template>
	<div class="content-box">
		<div v-draggable class="drag-box flx-center">我可以拖拽哦~</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.content-box {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	background-color: var(--el-bg-color);

	.drag-box {
		position: absolute;
		top: 110px;
		width: 300px;
		height: 300px;
		font-size: 23px;
		font-weight: bold;
		color: var(--el-color-primary-light-3);
		background: var(--el-color-primary-light-9);
		border-radius: 50%;
	}
}
</style>
