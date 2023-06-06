<template>
	<Box title="男女比例">
		<template #bottom>
			<div class="img">
				<div class="man">
					<img src="../../../../assets/images/screen/man.png" alt="" />
				</div>
				<div class="women">
					<img src="../../../../assets/images/screen/woman.png" alt="" />
				</div>
			</div>
			<div class="charts">
				<BaseEcharts :option="options"></BaseEcharts>
			</div>
		</template>
	</Box>
</template>

<script lang="ts" setup>
import type { EChartsOption } from "echarts"
import Box from "../box/Box.vue"

interface ChartProp {
	man: number
	woman: number
}

let options = ref<EChartsOption>()

const initChart = (data: ChartProp) => {
	options.value = {
		xAxis: {
			type: "value",
			show: false
		},
		grid: {
			left: 0,
			top: 0,
			bottom: 0,
			right: 0
		},
		yAxis: [
			{
				type: "category",
				position: "left",
				data: ["男生"],
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: false
				}
			},
			{
				type: "category",
				position: "right",
				data: ["女士"],
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: false,
					padding: [0, 0, 40, -60],
					fontSize: 12,
					lineHeight: 60,
					color: "rgba(255, 255, 255, 0.9)",
					formatter: "{value}" + data.woman * 100 + "%",
					rich: {
						a: {
							color: "transparent",
							lineHeight: 30,
							fontFamily: "digital",
							fontSize: 12
						}
					}
				}
			}
		],
		series: [
			{
				type: "bar",
				barWidth: 20,
				data: [data.man],
				z: 20,
				itemStyle: {
					borderRadius: 10,
					color: "#007AFE"
				},
				label: {
					show: true,
					color: "#E7E8ED",
					position: "insideLeft",
					offset: [0, -20],
					fontSize: 12,
					formatter: () => {
						return `男士 ${data.man * 100}%`
					}
				}
			},
			{
				type: "bar",
				barWidth: 20,
				data: [1],
				barGap: "-100%",
				itemStyle: {
					borderRadius: 10,
					color: "#FF4B7A"
				},
				label: {
					show: true,
					color: "#E7E8ED",
					position: "insideRight",
					offset: [0, -20],
					fontSize: 12,
					formatter: () => {
						return `女士 ${data.woman * 100}%`
					}
				}
			}
		]
	}
}

defineExpose({
	initChart
})
</script>

<style lang="scss" scoped>
.img {
	display: flex;
	align-items: center;
	justify-content: center;

	.man {
		width: 111px;
		height: 115px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20px;
		background: url(../../../../assets/images/screen/man-bg.png);
	}
	.women {
		width: 111px;
		height: 115px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20px;
		background: url(../../../../assets/images/screen/woman-bg.png);
	}
}

.charts {
	height: 100px;
	margin: 0 auto;
	width: 80%;
}
</style>
