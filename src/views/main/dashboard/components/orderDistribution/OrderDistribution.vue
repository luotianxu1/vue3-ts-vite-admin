<template>
	<Card title="商品订单分布占比">
		<template #sub>
			<span class="placeholder link">详情</span>
		</template>
		<BaseEcharts :option="orderDistributionOptions"></BaseEcharts>
	</Card>
</template>

<script lang="ts" setup>
import type { EChartsOption } from "echarts"
import Card from "@components/card/Card.vue"
import type { Dashboard } from "@/types/modules/dashboard"

interface IProps {
	orderDistributionData: Dashboard.IOrderDistributionDataItem[]
}

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

const props = defineProps<IProps>()

watch(
	() => props.orderDistributionData,
	newVal => {
		orderDistributionOptionsBase.series![0].data = newVal
		orderDistributionOptions.value = orderDistributionOptionsBase
	}
)
</script>

<style lang="scss" scoped></style>
