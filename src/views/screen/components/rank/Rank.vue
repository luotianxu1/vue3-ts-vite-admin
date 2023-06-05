<template>
	<Box title="性别比例">
		<template #bottom>
			<BaseEcharts :option="options"></BaseEcharts>
		</template>
	</Box>
</template>

<script lang="ts" setup>
import Box from "../box/Box.vue"
import type { EChartsOption } from "echarts"

let options = ref<EChartsOption>()
onMounted(() => {
	options.value = {
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
			top: 60,
			bottom: 40
		}
	}
})
</script>

<style lang="scss" scoped>
.charts {
	height: 100%;
	width: 100%;
}
</style>
