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

let options = ref<EChartsOption>()

onMounted(() => {
	setTimeout(() => {
		options.value = {
			tooltip: {
				trigger: "item"
			},
			legend: {
				right: 10,
				top: 40,
				orient: "vertical",
				textStyle: {
					color: "white",
					fontSize: 14
				}
			},
			series: [
				{
					name: "Access From",
					type: "pie",
					radius: ["40%", "70%"],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: "#fff",
						borderWidth: 2
					},
					label: {
						show: true,
						position: "inside",
						color: "white"
					},
					labelLine: {
						show: false
					},
					data: [
						{ value: 1048, name: "Search Engine" },
						{ value: 735, name: "Direct" },
						{ value: 580, name: "Email" },
						{ value: 484, name: "Union Ads" },
						{ value: 300, name: "Video Ads" }
					]
				}
			],
			grid: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			}
		}
	}, 1000)
})
</script>

<style lang="scss" scoped>
.charts {
	width: 100%;
	height: 260px;
}
</style>
