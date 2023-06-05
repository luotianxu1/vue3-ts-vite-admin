<template>
	<div class="box">
		<div class="top">
			<p class="title">实时游客统计</p>
			<p class="bg"></p>
			<p class="right">可预约总量<span>99999</span>人</p>
		</div>
		<div class="number">
			<span v-for="(item, index) in people" :key="index">{{ item }}</span>
		</div>
		<div class="charts" ref="charts"></div>
	</div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts"
import "echarts-liquidfill"

let people = ref("216908人")

let charts = ref<HTMLDivElement>()
onMounted(() => {
	if (!charts.value) return
	let myCharts = echarts.init(charts.value)
	myCharts.setOption({
		title: {
			text: "水球图"
		},
		xAxis: {
			show: false
		},
		yAxis: {
			show: false
		},
		series: {
			type: "liquidFill",
			data: [0.6],
			wavaAnimation: true,
			animationDuration: 3,
			animationDurationUpdate: 0,
			radius: "100%",
			outline: {
				show: true,
				borderDistance: 8,
				itemStyle: {
					color: "none",
					borderColor: "#294D99",
					borderWidth: 8,
					shadowBlur: 20,
					shadowColor: "rgba(0, 0, 0, 0.25)"
				}
			}
		},
		grid: {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		}
	})
})
</script>

<style lang="scss" scoped>
.box {
	background: url(../../../../assets/images/screen/dataScreen-main-lb.png) no-repeat;
	background-size: 100% 100%;
	margin-top: 10px;

	.top {
		margin-left: 20px;

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

		.right {
			float: right;
			color: white;
			font-size: 20px;
		}
	}

	.number {
		margin-top: 30px;
		display: flex;
		padding: 10px;

		span {
			flex: 1;
			height: 40px;
			text-align: center;
			line-height: 40px;
			background: url(../../../../assets/images/screen/total.png) no-repeat;
			background-size: 100% 100%;
			color: #29fcff;
		}
	}

	.charts {
		width: 100%;
		height: 240px;
	}
}
</style>
