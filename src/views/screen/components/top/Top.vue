<template>
	<div class="header">
		<div class="left">
			<span class="lbtn" @click="home">首页</span>
		</div>
		<div class="center">
			<div class="title">智慧旅游可视化大数据平台</div>
		</div>
		<div class="right">
			<span class="rbtn">统计报告</span>
			<span class="time">当前时间:{{ time }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { GLOB_APP_HOME } from "@/global/constants"
import dayjs from "dayjs"

// 返回首页
const userRouter = useRouter()
const home = () => {
	userRouter.push(GLOB_APP_HOME)
}

// 当前时间
const time = ref(dayjs().format("YYYY年MM月DD日 hh:mm:ss"))
let interval: any
onMounted(() => {
	interval = setInterval(() => {
		time.value = dayjs().format("YYYY年MM月DD日 hh:mm:ss")
	}, 1000)
})

onBeforeUnmount(() => {
	clearInterval(interval)
})
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	width: 100%;
	height: 40px;

	.left {
		flex: 1.5;
		background: url(../../../../assets/images/screen/dataScreen-header-left-bg.png) no-repeat;
		background-size: cover;

		.lbtn {
			float: right;
			width: 150px;
			height: 40px;
			font-size: 20px;
			line-height: 40px;
			color: #29fcff;
			text-align: center;
			cursor: pointer;
			background: url(../../../../assets/images/screen/dataScreen-header-btn-bg-l.png) no-repeat;
			background-size: 100% 100%;
		}
	}

	.center {
		flex: 2;

		.title {
			width: 100%;
			height: 74px;
			font-size: 30px;
			line-height: 74px;
			color: #29fcff;
			text-align: center;
			background: url(../../../../assets/images/screen/dataScreen-header-center-bg.png) no-repeat;
			background-size: 100% 100%;
		}
	}

	.right {
		display: flex;
		background: url(../../../../assets/images/screen/dataScreen-header-left-bg.png) no-repeat;
		background-size: cover;
		flex: 1.5;
		justify-content: space-between;
		align-items: center;

		.rbtn {
			width: 150px;
			height: 40px;
			font-size: 20px;
			line-height: 40px;
			color: #29fcff;
			text-align: center;
			cursor: pointer;
			background: url(../../../../assets/images/screen/dataScreen-header-btn-bg-r.png) no-repeat;
			background-size: 100% 100%;
		}

		.time {
			margin-right: 10px;
			font-size: 20px;
			color: #29fcff;
		}
	}
}
</style>
