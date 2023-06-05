<template>
	<div class="box">
		<div class="top">
			<p class="title">未来7天游客数量趋势图</p>
			<p class="bg"></p>
		</div>
		<div class="charts" ref="charts"></div>
	</div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts"

let charts = ref<HTMLDivElement>()
onMounted(() => {
	if (!charts.value) return
	let myCharts = echarts.init(charts.value)
	myCharts.setOption({
		title: {
			text: "访问量"
		},
		xAxis: {
			type: "category",
			boundaryGap: false,
			splitLine: {
				show: false
			},
			axisLine: {
				show: true
			},
			axisTick: {
				show: true
			},
			data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
		},
		yAxis: {
			splitLine: {
				show: false
			},
			axisLine: {
				show: true
			},
			axisTick: {
				show: true
			}
		},
		series: [
			{
				type: "line",
				data: [120, 240, 890, 99, 321, 66, 1200],
				smooth: true,
				areaStyle: {
					color: "red"
				}
			}
		],
		grid: {
			left: 40,
			right: 20,
			top: 0,
			bottom: 30
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
	}

	.charts {
		width: 100%;
		height: 260px;
	}
}
</style>
