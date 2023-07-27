<template>
	<ChartCard title="实时数据">
		<BaseEcharts :option="realTimeOptions"></BaseEcharts>
	</ChartCard>
</template>

<script lang="ts" setup>
import type { EChartsOption } from "echarts"
import ChartCard from "../chartCard/ChartCard.vue"

const realTimeOptions = ref<EChartsOption>()
const realTimeOptionsBase: EChartsOption = {
	tooltip: {
		trigger: "axis",
		axisPointer: {
			lineStyle: {
				color: "rgb(126,199,255)"
			}
		}
	},
	legend: {
		show: true,
		itemWidth: 30,
		itemHeight: 10
	},
	grid: {
		top: "20%",
		left: "4%",
		right: "4%",
		bottom: "15%"
	},
	xAxis: {
		type: "category",
		boundaryGap: false,
		splitLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		data: []
	},
	yAxis: {
		type: "value",
		splitLine: {
			show: false
		},
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		}
	},
	series: [
		{
			name: "餐饮",
			type: "line",
			symbol: "circle",
			showSymbol: false,
			smooth: true,
			lineStyle: {
				width: 1,
				color: "#00ffa2"
			},
			itemStyle: {
				color: "#00f0ff"
			},
			areaStyle: {
				color: {
					type: "linear",
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 0,
							color: "rgba(36, 214, 214, 0.6)"
						},
						{
							offset: 1,
							color: "rgba(36, 214, 214, 0)"
						}
					]
				}
			},
			data: []
		},
		{
			name: "零售",
			type: "line",
			showSymbol: false,
			symbol: "circle",
			smooth: true,
			lineStyle: {
				width: 1,
				color: "#3D84F7"
			},
			areaStyle: {
				color: {
					type: "linear",
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						// 渐变颜色
						{
							offset: 0,
							color: "rgba(61, 132, 247, 0.6)"
						},
						{
							offset: 1,
							color: "rgba(61, 132, 247, 0)"
						}
					]
				}
			},
			data: []
		}
	]
}
const realTimeData = [
	{ time: "2019", catering: "58", retail: "95" },
	{ time: "2020", catering: "76", retail: "30" },
	{ time: "2021", catering: "98", retail: "170" },
	{ time: "2022", catering: "77", retail: "60" },
	{ time: "2023", catering: "85", retail: "210" }
]

onMounted(() => {
	;(realTimeOptionsBase as any).xAxis.data = realTimeData.map(item => item.time)
	realTimeOptionsBase.series![0].data = realTimeData.map(item => item.catering)
	realTimeOptionsBase.series![1].data = realTimeData.map(item => item.retail)
	realTimeOptions.value = realTimeOptionsBase
})
</script>

<style lang="scss" scoped></style>
