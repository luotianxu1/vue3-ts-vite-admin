<template>
	<div class="footer">
		<span>Vue3-TS-Vite-Admin</span>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.footer {
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--el-bg-color);
	border-top: 1px solid var(--el-border-color);
	span {
		font-size: 14px;
		text-decoration: none;
		letter-spacing: 0.5px;
		color: var(--el-text-color-secondary);
	}
}
</style>
