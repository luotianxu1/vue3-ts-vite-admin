<template>
	<el-col :span="6">
		<Card :title="props.todaysData.title">
			<template #sub>
				<el-tooltip :content="props.todaysData.title" placement="top-start">
					<i class="iconfont icon-tishi icon"></i>
				</el-tooltip>
			</template>
			<div class="card">
				<div class="card-left">
					<div class="card-number" ref="countRef">{{ props.todaysData.number }}</div>
					<div class="card-qushi">
						<span>{{ props.todaysData.subTitle }}</span>
						<span :class="props.todaysData.value > 0 ? 'red' : 'green'">
							{{ todaysData.value }}%
							<i class="iconfont" :class="todaysData.value > 0 ? 'icon-shangsheng' : 'icon-xiajiang'"></i>
						</span>
					</div>
				</div>
				<div class="card-right">
					<BaseEcharts :option="echartsOption"></BaseEcharts>
				</div>
			</div>
		</Card>
	</el-col>
</template>
<script lang="ts" setup>
import type { ITodaysDataItem } from "@/types"
import type { EChartsOption } from "echarts"
import { CountUp } from "countup.js"

interface IProps {
	todaysData: ITodaysDataItem
}
const props = defineProps<IProps>()
const echartsOption = ref<EChartsOption>()
let echartsOptionBase: EChartsOption = {
	grid: {
		top: 30,
		left: 0,
		bottom: 0,
		right: -4,
		containLabel: true
	},
	xAxis: {
		show: false,
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			show: false
		},
		type: "category",
		data: []
	},
	yAxis: {
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			show: false
		},
		show: false,
		type: "value"
	},
	series: [
		{
			data: [],
			type: "line",
			smooth: true,
			lineStyle: {
				width: 2
			},
			areaStyle: {
				opacity: 0.8,
				color: "rgb(240, 244, 255)"
			}
		}
	]
}

const countRef = ref<HTMLElement>()

watch(
	() => props.todaysData,
	newVal => {
		echartsOption.value = JSON.parse(JSON.stringify(echartsOptionBase))
		if (!echartsOption.value) return
		;(echartsOption.value.xAxis as any).data = newVal.week.map(item => item.title)
		echartsOption.value.series![0].data = newVal.week.map((data, index) => {
			if (index === newVal.week!.length - 1) {
				return {
					value: data.value,
					symbolSize: 6,
					itemStyle: {
						color: newVal.value > 0 ? "red" : "green"
					}
				}
			} else {
				return {
					value: data.value,
					symbolSize: 0
				}
			}
		})
		echartsOption.value.series![0].lineStyle.color = newVal.value > 0 ? "red" : "green"

		nextTick(() => {
			const countUp1 = new CountUp(countRef.value!, newVal.number)
			countUp1.start()
		})
	},
	{
		immediate: true,
		deep: true
	}
)
</script>
<style lang="scss" scoped>
.card {
	flex: 1;
	display: flex;

	.card-left {
		width: 50%;

		.card-number {
			margin: 5px 0;
			font-size: 24px;
			font-weight: 600;
			letter-spacing: 2px;
		}

		.card-qushi {
			display: flex;
			font-size: 14px;
			align-items: center;

			> span {
				&:nth-child(2) {
					padding-left: 5px;
				}
			}
		}
	}

	.card-right {
		flex: 1;
	}
}

.icon {
	&:hover {
		cursor: pointer;
	}
}

.red {
	color: #f56c6c;
}

.green {
	color: #94d870;
}
</style>
