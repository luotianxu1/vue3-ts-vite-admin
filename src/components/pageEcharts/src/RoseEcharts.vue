<template>
	<div class="roseCharts">
		<BaseEcharts :option="options"></BaseEcharts>
	</div>
</template>

<script lang="ts" setup>
import BaseEcharts from "./BaseEcharts.vue"
import type { EChartsOption } from "echarts"

const options = ref<EChartsOption>()

onMounted(() => {
	options.value = {
		legend: {
			top: "bottom"
		},
		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				saveAsImage: { show: true }
			}
		},
		series: [
			{
				name: "Nightingale Chart",
				type: "pie",
				radius: [10, 80],
				center: ["50%", "50%"],
				roseType: "area",
				itemStyle: {
					borderRadius: 8
				},
				data: [
					{ value: 40, name: "rose 1" },
					{ value: 38, name: "rose 2" },
					{ value: 32, name: "rose 3" },
					{ value: 30, name: "rose 4" },
					{ value: 28, name: "rose 5" },
					{ value: 26, name: "rose 6" },
					{ value: 22, name: "rose 7" },
					{ value: 18, name: "rose 8" }
				]
			}
		]
	}
})
</script>

<style lang="scss" scoped>
.roseCharts {
	width: 100%;
	height: 100%;
}
</style>
