<template>
	<Card title="月销售品牌排行">
		<template #sub>
			<span class="placeholder link">更多</span>
		</template>
		<BaseEcharts :option="salesRankOptions"></BaseEcharts>
	</Card>
</template>

<script lang="ts" setup>
import type { EChartsOption } from "echarts"
import Card from "@components/card/Card.vue"
import type { ISalesRankOptionsDataItem } from "@/types/modules/dashboard"

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

interface IProps {
	salesRankOptionsData: ISalesRankOptionsDataItem[]
}
const props = defineProps<IProps>()

watch(
	() => props.salesRankOptionsData,
	newVal => {
		// 月销售排行
		salesRankOptionsBase.yAxis![0].data = newVal.map(item => item.name)
		salesRankOptionsBase.yAxis![1].data = newVal.map(item => item.finished)
		salesRankOptionsBase.series![0].data = new Array(newVal.length).fill(100)
		salesRankOptionsBase.series![1].data = newVal.map(item => item.percent)
		salesRankOptions.value = salesRankOptionsBase
	}
)
</script>

<style lang="scss" scoped></style>
