<template>
	<div class="box">
		<div class="top">
			<p class="title">{{ props.title }}</p>
			<p class="bg"></p>
			<slot name="subText"></slot>
		</div>
		<div class="bottom">
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

	.top {
		height: 60px;
		padding: 0 20px;

		.title {
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

	.bottom {
		flex: 1;
	}
}
</style>
