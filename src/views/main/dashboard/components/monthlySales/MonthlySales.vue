<template>
	<ChartCard title="月销售品牌排行">
		<template #sub>
			<span class="placeholder link">更多</span>
		</template>
		<BaseEcharts :option="salesRankOptions"></BaseEcharts>
	</ChartCard>
</template>

<script lang="ts" setup>
import type { EChartsOption } from "echarts"
import ChartCard from "../chartCard/ChartCard.vue"

// 月销售排行
const salesRankOptions = ref<EChartsOption>()
const salesRankOptionsBase: EChartsOption = {
	grid: {
		left: "15%",
		right: "15%",
		bottom: "10%",
		top: "0"
	},
	xAxis: [
		{
			show: false,
			splitLine: {
				show: false
			}
		},
		{
			show: false
		}
	],
	yAxis: [
		{
			show: true,
			data: [],
			position: "left",
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			}
		},
		{
			show: true,
			data: [],
			position: "right",
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			}
		}
	],
	series: [
		{
			name: "百分比",
			type: "bar",
			xAxisIndex: 0,
			barGap: "-100%",
			barWidth: 15,
			itemStyle: {
				borderRadius: 10
			},
			data: []
		},
		{
			name: "进度",
			type: "bar",
			xAxisIndex: 1,
			barWidth: 15,
			itemStyle: {
				borderRadius: 10,
				color: "#1260e2"
			},
			data: [],
			label: {
				show: true,
				position: "insideRight",
				formatter: "{c}%",
				offset: [-10, 2],
				color: "#fff"
			},
			animationDelay: 1000,
			animationDuration: 1000
		}
	]
}
const salesRankDatas = [
	{ name: "佳能", percent: "58", total: "158111", finished: "82311" },
	{ name: "松下", percent: "76", total: "16522", finished: "9873" },
	{ name: "索尼", percent: "98", total: "5823", finished: "5500" },
	{ name: "尼康", percent: "77", total: "3244", finished: "2355" },
	{ name: "富士", percent: "85", total: "15344", finished: "12009" }
]

onMounted(() => {
	// 月销售排行
	salesRankOptionsBase.yAxis![0].data = salesRankDatas.map(item => item.name)
	salesRankOptionsBase.yAxis![1].data = salesRankDatas.map(item => item.finished)
	salesRankOptionsBase.series![0].data = new Array(salesRankDatas.length).fill(100)
	salesRankOptionsBase.series![1].data = salesRankDatas.map(item => item.percent)
	salesRankOptions.value = salesRankOptionsBase
})
</script>

<style lang="scss" scoped></style>
