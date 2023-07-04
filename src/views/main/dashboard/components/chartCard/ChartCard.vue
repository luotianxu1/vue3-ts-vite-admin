<template>
	<div class="chartCard">
		<div class="header">123</div>
		<slot></slot>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.chartCard {
	display: flex;
	width: 100%;
	height: 280px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 5px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.0470588235294118);
	flex-direction: column;

	.header {
		padding: 0 10px;
		line-height: 30px;
		border-bottom: 1px solid #ccc;
		flex: 1;
	}
}
</style>
