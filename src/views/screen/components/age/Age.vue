<template>
	<Box title="年龄比例">
		<template #bottom>
			<BaseEcharts :option="options"></BaseEcharts>
		</template>
	</Box>
</template>

<script lang="ts" setup>
import Box from "../box/Box.vue"
import type { EChartsOption } from "echarts"

interface ChartProp {
	value: number
	name: string
	percentage: string
}

let options = ref<EChartsOption>()

const initChart = (data: ChartProp[]) => {
	const colors = ["#F6C95C", "#EF7D33", "#1F9393", "#184EA1", "#81C8EF", "#9270CA"]
	options.value = {
		color: colors,
		tooltip: {
			show: true,
			trigger: "item",
			formatter: "{b} <br/>占比：{d}%"
		},
		legend: {
			orient: "vertical",
			right: "20px",
			top: "15px",
			itemGap: 15,
			itemWidth: 14,
			formatter: function (name) {
				let text = ""
				data.forEach((val: ChartProp) => {
					if (val.name === name) {
						text = " " + name + "　 " + val.percentage
					}
				})
				return text
			},
			textStyle: {
				color: "#fff"
			}
		},
		grid: {
			top: "bottom",
			left: 10,
			bottom: 10
		},
		series: [
			{
				zlevel: 1,
				// name: "年龄比例",
				type: "pie",
				selectedMode: "single",
				radius: [50, 90],
				center: ["35%", "50%"],
				startAngle: 60,
				label: {
					position: "inside",
					show: true,
					color: "#fff",
					formatter: function (params: any) {
						return params.data.percentage
					},
					rich: {
						b: {
							fontSize: 16,
							lineHeight: 30,
							color: "#fff"
						}
					}
				},
				itemStyle: {
					shadowColor: "rgba(0, 0, 0, 0.2)",
					shadowBlur: 10
				},
				data: data.map((val: ChartProp, index: number) => {
					return {
						value: val.value,
						name: val.name,
						percentage: val.percentage,
						itemStyle: {
							borderWidth: 10,
							shadowBlur: 20,
							borderColor: colors[index],
							borderRadius: 10
						}
					}
				})
			},
			{
				name: "",
				type: "pie",
				selectedMode: "single",
				radius: [50, 90],
				center: ["35%", "50%"],
				startAngle: 60,
				data: [
					{
						value: 1000,
						name: "",
						label: {
							show: true,
							formatter: "{a|本日总数}",
							rich: {
								a: {
									align: "center",
									color: "rgb(98,137,169)",
									fontSize: 14
								}
							},
							position: "center"
						}
					}
				]
			}
		]
	}
}

defineExpose({
	initChart
})
</script>

<style lang="scss" scoped>
.charts {
	width: 100%;
	height: 260px;
}
</style>
