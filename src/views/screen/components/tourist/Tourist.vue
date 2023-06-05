<template>
	<Box title="实时游客统计">
		<template #subText>
			<p class="right">可预约总量<span>99999</span>人</p>
		</template>
		<template #bottom>
			<div class="number">
				<span v-for="(item, index) in people" :key="index">{{ item }}</span>
			</div>
			<div class="charts" ref="charts">
				<BaseEcharts :option="options"></BaseEcharts>
			</div>
		</template>
	</Box>
</template>

<script lang="ts" setup>
import Box from "../box/Box.vue"
import * as echarts from "echarts"
import "echarts-liquidfill"
import type { EChartsOption } from "echarts"

let people = ref("216908人")

let options = ref<EChartsOption>()
onMounted(() => {
	setTimeout(() => {
		options.value = {
			title: {
				text: "水球图"
			},
			xAxis: {
				show: false
			},
			yAxis: {
				show: false
			},
			series: [
				{
					type: "liquidFill",
					data: [0.6],
					wavaAnimation: true,
					animationDuration: 3,
					animationDurationUpdate: 0,
					radius: "80%",
					outline: {
						show: true,
						borderDistance: 8,
						itemStyle: {
							color: "none",
							borderColor: "#294D99",
							borderWidth: 8,
							shadowBlur: 20,
							shadowColor: "rgba(0, 0, 0, 0.25)"
						}
					}
				} as any
			],
			grid: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			}
		}
	}, 500)
})
</script>

<style lang="scss" scoped>
.right {
	float: right;
	color: white;
	font-size: 20px;
}
.number {
	display: flex;
	padding: 10px;

	span {
		flex: 1;
		height: 40px;
		text-align: center;
		line-height: 40px;
		background: url(../../../../assets/images/screen/total.png) no-repeat;
		background-size: 100% 100%;
		color: #29fcff;
	}
}

.charts {
	width: 100%;
	height: 240px;
}
</style>
