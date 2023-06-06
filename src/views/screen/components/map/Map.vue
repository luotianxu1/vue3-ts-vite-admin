<template>
	<div class="content">
		<div class="title">景区实时客流量</div>
		<div class="charts">
			<BaseEcharts :option="options"></BaseEcharts>
		</div>
	</div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts"
import chinaJSON from "@assets/json/chinajson.json"
import type { EChartsOption } from "echarts"

interface ChartProp {
	fromName: string
	toName: string
	coords: any
}

let planePath: string =
	"path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z"

echarts.registerMap("china", chinaJSON as any)

let options = ref<EChartsOption>()
const initChart = (data: ChartProp[]) => {
	options.value = {
		// 悬浮窗
		tooltip: {
			trigger: "item",
			formatter: function (params: any) {
				return `${params.name}: ${params.value || "-"}`
			}
		},
		// echarts大小位置
		grid: {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		},
		geo: {
			map: "china",
			zoom: 1.5,
			center: [102.848234, 32.82333],
			scaleLimit: {
				min: 0.8
			},
			label: {
				color: "#fff",
				show: true
			},
			emphasis: {
				label: {
					color: "#fff",
					show: true
				},
				itemStyle: {
					areaColor: {
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#073684" // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#2B91B7" // 100% 处的颜色
							}
						]
					}
				}
			},
			roam: false,
			itemStyle: {
				areaColor: {
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 0,
							color: "#073684" // 0% 处的颜色
						},
						{
							offset: 1,
							color: "#061E3D" // 100% 处的颜色
						}
					]
				},
				borderColor: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,
					[
						{
							offset: 0,
							color: "#00F6FF"
						},
						{
							offset: 1,
							color: "#87ADCB"
						}
					],
					false
				),
				shadowColor: "rgba(10,76,139,1)",
				shadowOffsetY: 0,
				shadowBlur: 60,
				borderWidth: 1
			},
			tooltip: {
				show: false
			}
		},
		// 要显示的散点数据
		series: [
			{
				type: "lines",
				coordinateSystem: "geo",
				zlevel: 1,
				effect: {
					show: true,
					period: 6,
					trailLength: 0.7,
					color: "red", // arrow箭头的颜色
					symbolSize: 3
				},
				lineStyle: {
					color: "#fff",
					width: 0,
					curveness: 0.2
				},
				data
			},
			{
				type: "lines",
				coordinateSystem: "geo",
				zlevel: 2,
				symbol: ["none", "arrow"],
				symbolSize: 10,
				effect: {
					show: true,
					period: 6,
					trailLength: 0,
					symbol: planePath,
					symbolSize: 15
				},
				lineStyle: {
					color: "#fff",
					width: 1,
					opacity: 0.6,
					curveness: 0.2
				},
				data
			}
		]
	}
}

defineExpose({
	initChart
})
</script>

<style lang="scss" scoped>
.content {
	position: relative;
	padding-top: 40px;
	display: flex;
}

.title {
	position: absolute;
	top: 45px;
	left: 0;
	z-index: 99;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	width: 270px;
	height: 25px;
	padding-left: 30px;
	font-size: 14px;
	color: #ffffff;
	letter-spacing: 5px;
	background: url(../../../../assets/images/screen/map-title-bg.png) no-repeat;
	background-size: 100% 100%;
}

.charts {
	flex: 1;
}
</style>
