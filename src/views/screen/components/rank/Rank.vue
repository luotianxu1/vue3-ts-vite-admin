<template>
	<div class="box">
		<div class="top">
			<p class="title">性别比例</p>
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
			text: "景区排行",
			left: "50%",
			textStyle: {
				color: "yellowgreen",
				fontSize: 20
			},
			subtext: "各大景区排行",
			subtextStyle: {
				color: "yellowgreen"
			}
		},
		xAxis: {},
		yAxis: {},
		series: [
			{
				type: "bar",
				data: [10, 20, 30, 40, 50, 60, 70],
				label: {
					show: true,
					position: "insideTop"
				},
				showBackground: true,
				backgroundStyle: {
					color: "black"
				},
				itemStyle: {
					borderRadius: [10, 10, 0, 0]
				}
			}
		],
		grid: {
			left: 40,
			right: 40,
			top: 20,
			bottom: 20
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
		height: 100%;
		width: 100%;
	}
}
</style>
