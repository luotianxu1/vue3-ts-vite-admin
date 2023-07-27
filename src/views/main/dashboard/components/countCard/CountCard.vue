<template>
	<div class="card">
		<div class="card-header">
			{{ props.title }}
			<el-tooltip :content="props.title" placement="top-start">
				<i class="iconfont icon-tishi"></i>
			</el-tooltip>
		</div>
		<div class="card-bottom">
			<div class="card-left">
				<div class="card-number" ref="countRef">{{ props.number }}</div>
				<div class="card-qushi">
					<span>{{ props.subTitle }}</span>
					<span :class="props.value > 0 ? 'red' : 'green'">
						{{ props.value }}%
						<i class="iconfont" :class="props.value > 0 ? 'icon-shangsheng' : 'icon-xiajiang'"></i>
					</span>
				</div>
			</div>
			<div class="card-right">
				<BaseEcharts :option="options"></BaseEcharts>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { CountUp } from "countup.js"
import type { EChartsOption } from "echarts"

interface IProps {
	title: string
	tips: string
	number: number
	subTitle: string
	value: number
	week: number[]
}
const props = defineProps<IProps>()

const countRef = ref<HTMLElement>()
const options = ref<EChartsOption>()
let echartsOptions: EChartsOption = {
	grid: {
		top: 20,
		left: 0,
		bottom: 0,
		right: 0
	},
	xAxis: {
		show: false,
		type: "category",
		data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
	},
	yAxis: {
		show: false,
		type: "value"
	},
	series: [
		{
			data: [],
			type: "line",
			smooth: true,
			lineStyle: {
				color: props.value > 0 ? "red" : "green",
				width: 2
			},
			areaStyle: {
				opacity: 0.8,
				color: "rgb(240, 244, 255)"
			}
		}
	]
}
onMounted(() => {
	const countUp = new CountUp(countRef.value!, props.number)
	countUp.start()
	echartsOptions.series![0].data = props.week.map((item, index) => {
		if (index === props.week.length - 1) {
			return {
				value: item,
				symbolSize: 6,
				itemStyle: {
					color: props.value > 0 ? "red" : "green"
				}
			}
		} else {
			return {
				value: item,
				symbolSize: 0
			}
		}
	})
	options.value = echartsOptions
})
</script>

<style lang="scss" scoped>
.card {
	display: flex;
	flex-direction: column;
	padding: 15px;
	line-height: 30px;
	text-align: left;
	background-color: var(--base-color);
	border-radius: 5px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.0470588235294118);

	.card-header {
		position: relative;
		padding-left: 15px;

		&::before {
			position: absolute;
			top: 50%;
			left: 0;
			width: 5px;
			height: 60%;
			background-color: var(--el-color-primary);
			border-radius: 10px;
			content: "";
			transform: translateY(-50%);
		}

		i {
			color: var(--el-text-color-placeholder);
			cursor: pointer;
		}
	}

	.card-bottom {
		flex: 1;
		display: flex;

		.card-left {
			width: 50%;

			.card-number {
				margin: 10px 0;
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
}

.red {
	color: #f56c6c;
}

.green {
	color: #94d870;
}
</style>
