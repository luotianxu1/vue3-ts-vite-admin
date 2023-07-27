<template>
	<div class="card">
		<div class="card-header">
			<div class="header-left">{{ props.title }}</div>
			<div class="header-right">
				<slot name="sub"></slot>
			</div>
		</div>
		<div class="card-content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface IProps {
	title: string
}
const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
.card {
	display: flex;
	height: 310px;
	padding: 15px;
	overflow: hidden;
	line-height: 30px;
	background-color: var(--base-color);
	border-radius: 5px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.0470588235294118);
	flex-direction: column;

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.header-left {
			position: relative;
			padding-left: 15px;
			margin-bottom: 10px;

			&::before {
				position: absolute;
				top: 50%;
				left: 0;
				width: 5px;
				height: 60%;
				background-color: var(--el-color-primary);
				border-radius: 10px;
				content: "";
				transform: translateY(-50%);
			}

			i {
				color: var(--el-text-color-placeholder);
				cursor: pointer;
			}
		}
	}

	.card-content {
		overflow: hidden;
		flex: 1;
	}
}
</style>
