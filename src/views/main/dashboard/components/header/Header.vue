<template>
	<el-row :gutter="10">
		<el-col :span="6" v-for="(item, index) in amountList" :key="index">
			<Card :title="item.title">
				<template #sub>
					<el-tooltip :content="item.title" placement="top-start">
						<i class="iconfont icon-tishi icon"></i>
					</el-tooltip>
				</template>
				<div class="card">
					<div class="card-left">
						<div class="card-number" ref="countRef">{{ item.number }}</div>
						<div class="card-qushi">
							<span>{{ item.subTitle }}</span>
							<span :class="item.value > 0 ? 'red' : 'green'">
								{{ item.value }}%
								<i class="iconfont" :class="item.value > 0 ? 'icon-shangsheng' : 'icon-xiajiang'"></i>
							</span>
						</div>
					</div>
					<div class="card-right">
						<BaseEcharts :option="item.option"></BaseEcharts>
					</div>
				</div>
			</Card>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
import type { ITodaysDataItem } from "@/types"
import type { EChartsOption } from "echarts"
import Card from "@components/card/Card.vue"

interface IProps {
	todaysData: ITodaysDataItem[]
}
const props = defineProps<IProps>()

interface ICardData extends ITodaysDataItem {
	option?: EChartsOption
}
let echartsOptions: EChartsOption = {
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

let amountList = ref<ICardData[]>()
watch(
	() => props.todaysData,
	newVal => {
		amountList.value = newVal
		amountList.value.forEach(item => {
			item.option = JSON.parse(JSON.stringify(echartsOptions))
			;(item.option!.xAxis! as any).data = item.week.map(item => item.title)
			item.option!.series![0].data = item.week.map((data, index) => {
				if (index === item.week!.length - 1) {
					return {
						value: data.value,
						symbolSize: 6,
						itemStyle: {
							color: item.value > 0 ? "red" : "green"
						}
					}
				} else {
					return {
						value: data.value,
						symbolSize: 0
					}
				}
			})
			item.option!.series![0].lineStyle.color = item.value > 0 ? "red" : "green"
		})
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
