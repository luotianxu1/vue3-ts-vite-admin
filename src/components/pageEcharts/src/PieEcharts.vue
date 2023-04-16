<template>
	<div class="pieCharts">
		<BaseEcharts :option="options"></BaseEcharts>
	</div>
</template>

<script lang="ts" setup>
import BaseEcharts from "./BaseEcharts.vue"
import type { EChartsOption } from "echarts"

const options: EChartsOption = {
	title: {
		text: "Render of a Website",
		subtext: "FakeData",
		left: "center"
	},
	tooltip: {
		trigger: "item"
	},
	legend: {
		orient: "vertical",
		left: "left"
	},
	series: [
		{
			name: "Access From",
			type: "pie",
			radius: "50%",
			data: [
				{ value: 1048, name: "Search Engine" },
				{ value: 735, name: "Direct" },
				{ value: 580, name: "Email" },
				{ value: 484, name: "Union Ads" },
				{ value: 300, name: "Video Ads" }
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: "rgba(0, 0, 0, 0.5)"
				}
			}
		}
	]
}
</script>

<style lang="scss" scoped>
.pieCharts {
	width: 100%;
	height: 100%;
}
</style>
