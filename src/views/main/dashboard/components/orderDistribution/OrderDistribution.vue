<template>
	<ChartCard title="商品订单分布占比">
		<BaseEcharts :option="orderDistributionOptions"></BaseEcharts>
	</ChartCard>
</template>

<script lang="ts" setup>
import type { EChartsOption } from "echarts"
import ChartCard from "../chartCard/ChartCard.vue"

const orderDistributionOptions = ref<EChartsOption>()
const orderDistributionOptionsBase: EChartsOption = {
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
			data: []
		}
	]
}
const orderDistributionData = [
	{ value: 40, name: "rose 1" },
	{ value: 38, name: "rose 2" },
	{ value: 32, name: "rose 3" },
	{ value: 30, name: "rose 4" },
	{ value: 28, name: "rose 5" },
	{ value: 26, name: "rose 6" },
	{ value: 22, name: "rose 7" },
	{ value: 18, name: "rose 8" }
]

onMounted(() => {
	orderDistributionOptionsBase.series![0].data = orderDistributionData
	orderDistributionOptions.value = orderDistributionOptionsBase
})
</script>

<style lang="scss" scoped></style>
