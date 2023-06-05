<template>
	<div class="lineCharts">
		<BaseEcharts :option="options"></BaseEcharts>
	</div>
</template>

<script lang="ts" setup>
import BaseEcharts from "./BaseEcharts.vue"
import type { EChartsOption } from "echarts"

const options = ref<EChartsOption>()

onMounted(() => {
	options.value = {
		xAxis: {
			type: "category",
			boundaryGap: false,
			data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
		},
		yAxis: {
			type: "value"
		},
		series: [
			{
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: "line",
				areaStyle: {}
			}
		]
	}
})
</script>

<style lang="scss" scoped>
.lineCharts {
	width: 100%;
	height: 100%;
}
</style>
