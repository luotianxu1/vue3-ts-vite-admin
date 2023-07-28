<template>
	<Card title="实时数据">
		<template #sub>
			<el-radio-group v-model="radioValue" size="small">
				<el-radio-button v-for="(item, value) in radioList" :key="value" :label="value" />
			</el-radio-group>
		</template>
		<BaseEcharts :option="realTimeOptions"></BaseEcharts>
	</Card>
</template>

<script lang="ts" setup>
import type { EChartsOption } from "echarts"
import Card from "@components/card/Card.vue"
import type { IRealTimeDataItem } from "@/types/modules/dashboard"

interface IProps {
	realTimeData: IRealTimeDataItem[]
}
const props = defineProps<IProps>()

const radioList = {
	近5年: "fiveYear",
	近1年: "oneYear",
	近1月: "oneMonth"
}

const radioValue = ref("近5年")

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

watch(
	() => [props.realTimeData, radioValue.value],
	() => {
		let realTimeData = props.realTimeData.filter(item => item.time === radioList[radioValue.value])[0]?.data
		if (realTimeData) {
			;(realTimeOptionsBase as any).xAxis.data = realTimeData.map(item => item.time)
			realTimeOptionsBase.series![0].data = realTimeData.map(item => item.catering)
			realTimeOptionsBase.series![1].data = realTimeData.map(item => item.retail)
			realTimeOptions.value = JSON.parse(JSON.stringify(realTimeOptionsBase))
		}
	}
)
</script>

<style lang="scss" scoped></style>
