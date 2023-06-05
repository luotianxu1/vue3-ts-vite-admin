<template>
	<Box title="未来7天游客数量趋势图">
		<template #bottom>
			<BaseEcharts :option="options"></BaseEcharts>
		</template>
	</Box>
</template>

<script lang="ts" setup>
import type { EChartsOption } from "echarts"
import Box from "../box/Box.vue"

let options = ref<EChartsOption>()
onMounted(() => {
	options.value = {
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
			left: 60,
			right: 20,
			top: 40,
			bottom: 40
		}
	}
})
</script>

<style lang="scss" scoped>
.charts {
	width: 100%;
	height: 260px;
}
</style>
