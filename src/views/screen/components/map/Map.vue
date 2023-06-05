<template>
	<div>
		<BaseEcharts :option="options"></BaseEcharts>
	</div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts"
import chinaJSON from "@assets/json/chinajson.json"
import type { EChartsOption } from "echarts"

echarts.registerMap("china", chinaJSON as any)

let options = ref<EChartsOption>()
onMounted(() => {
	options.value = {
		geo: {
			map: "china",
			roam: true, // 鼠标缩放
			left: 50,
			top: 50,
			right: 50,
			bottom: -150,
			label: {
				show: true,
				color: "white",
				fontSize: 14
			},
			itemStyle: {
				color: "red",
				opacity: 0.8
			}
		},
		gird: {
			left: 0,
			top: 0,
			right: 0,
			bottom: 0
		},
		series: [
			{
				type: "lines",
				data: [
					{
						coords: [
							[116.405285, 39.904989],
							[119.306239, 26.075302]
						],
						lineStyle: {
							color: "white",
							width: 5
						}
					}
				],
				effect: {
					show: true,
					symbol: "arrow",
					color: "orange",
					symbolSize: 10
				}
			}
		]
	}
})
</script>

<style lang="scss" scoped></style>
