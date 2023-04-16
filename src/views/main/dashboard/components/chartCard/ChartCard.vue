<template>
	<div class="chartCard">
		<div class="header">123</div>
		<slot></slot>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.chartCard {
	width: 100%;
	height: 280px;
	display: flex;
	flex-direction: column;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 5px;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.0470588235294118);

	.header {
		flex: 1;
		line-height: 30px;
		padding: 0 10px;
		border-bottom: 1px solid #ccc;
	}
}
</style>
