<template>
	<div class="footer">
		<span>Vue3-TS-Vite-Admin</span>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.footer {
	display: flex;
	height: 30px;
	background-color: var(--el-bg-color);
	background-color: var(--base-color);
	border-top: 1px solid var(--el-border-color);
	align-items: center;
	justify-content: center;

	span {
		font-size: 14px;
		letter-spacing: 0.5px;
		color: var(--el-text-color-secondary);
		text-decoration: none;
	}
}
</style>
