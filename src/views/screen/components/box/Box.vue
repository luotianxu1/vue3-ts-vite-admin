<template>
	<div class="box">
		<div class="box-header">
			<p class="box-title">{{ props.title }}</p>
			<p class="bg"></p>
			<slot name="subText"></slot>
		</div>
		<div class="box-bottom">
			<slot name="bottom"></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface Props {
	title: string
}
const props = withDefaults(defineProps<Props>(), {
	title: ""
})
</script>

<style lang="scss" scoped>
.box {
	display: flex;
	flex-direction: column;
	background: url(../../../../assets/images/screen/dataScreen-main-lb.png) no-repeat;
	background-size: 100% 100%;
	margin-top: 10px;

	.box-header {
		height: 67px;
		padding-right: 10px;

		.box-title {
			color: white;
			font-size: 20px;
		}

		.bg {
			width: 68px;
			height: 7px;
			background: url(../../../../assets/images/screen/dataScreen-title.png) no-repeat;
			background-size: 100% 100%;
			margin-top: 10px;
		}
	}

	.box-bottom {
		height: calc(100% - 67px);
		width: 100%;
	}
}
</style>
