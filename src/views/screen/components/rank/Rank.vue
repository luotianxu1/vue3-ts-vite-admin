<template>
	<Box title="热门景区排行">
		<template #bottom>
			<div class="content">
				<div class="header">
					<span>排名</span>
					<span>景区</span>
					<span>预约数量</span>
				</div>
				<div class="charts">
					<BaseEcharts :option="options"></BaseEcharts>
				</div>
			</div>
		</template>
	</Box>
</template>

<script lang="ts" setup>
import Box from "../box/Box.vue"
import type { EChartsOption } from "echarts"

interface ChartItem {
	name: string
	value: number
	percentage: string
	maxValue: number
}

interface ChartProps {
	data: any[]
	colors: string[]
}

let options = ref<EChartsOption>()

const initChart = (data: ChartProps) => {
	options.value = {
		grid: {
			top: "5%",
			left: "7%",
			right: "4%",
			bottom: "1%",
			containLabel: true
		},
		xAxis: {
			type: "value",
			axisLine: {
				show: false,
				lineStyle: {
					color: "white"
				}
			},
			nameGap: 1,
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false,
				fontSize: 16
			},
			triggerEvent: false
		},
		yAxis: [
			{
				show: true,
				data: data.data.map((val: ChartItem) => val.name),
				inverse: true,
				axisLine: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					color: "#fff",
					formatter: function (value: any) {
						let str = value.length > 6 ? value.slice(0, 6) + "..." : value
						let index = data.data.map((item: ChartItem) => item.name).indexOf(value) + 1
						return ["NO." + index, "{title|" + str + "}"].join(" ")
					},
					rich: {
						title: {
							width: 60,
							fontSize: 13,
							align: "center",
							padding: [0, 10, 0, 15]
						}
					}
				},
				triggerEvent: false
			},
			{
				show: true,
				inverse: true,
				data: data.data,
				axisLabel: {
					fontSize: 14,
					color: "#fff",
					margin: 20,
					formatter: (value: any) => {
						return value >= 10000 ? (value / 10000).toFixed(2) + "w" : value
					}
				},
				axisLine: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				triggerEvent: false
			}
		],
		series: [
			{
				name: "条",
				type: "bar",
				yAxisIndex: 0,
				data: data.data,
				barWidth: 12,
				itemStyle: {
					borderRadius: 30,
					color: function (params) {
						let num = data.colors.length
						return data.colors[params.dataIndex % num]
					}
				},
				label: {
					show: true,
					position: [12, 0],
					lineHeight: 14,
					color: "#fff",
					formatter: (params: any) => {
						return params.data.percentage
					}
				}
			},
			{
				name: "框",
				type: "bar",
				yAxisIndex: 1,
				data: data.data.map((val: ChartItem) => {
					if (!val.maxValue) {
						return 5
					}
					return val.maxValue
				}),
				barWidth: 18,
				itemStyle: {
					color: "none",
					borderColor: "#00c1de",
					borderWidth: 1,
					borderRadius: 15
				},
				silent: true
			}
		]
	}
}

defineExpose({
	initChart
})
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	.header {
		box-sizing: border-box;
		display: flex;
		height: 36px;
		margin: 10px 10px 0;
		line-height: 36px;
		background: url("../../../../assets/images/screen/rankingChart-bg.png") no-repeat;
		background-size: 100% 100%;

		span {
			width: 18%;
			margin-left: 4px;
			font-size: 14px;
			font-weight: bold;
			color: #fdbc52;
			text-align: center;
			&:nth-child(2) {
				margin-left: 4px;
			}
			&:last-child {
				width: 20%;
				margin-left: 60px;
			}
		}
	}
}
.charts {
	flex: 1;
}
</style>
