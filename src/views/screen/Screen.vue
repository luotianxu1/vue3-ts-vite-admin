<template>
	<div class="main">
		<div class="screen" ref="screenRef">
			<Top></Top>
			<div class="bottom">
				<div class="left">
					<Tourist class="item" ref="touristRef"></Tourist>
					<Sex class="item" ref="sexRef"></Sex>
					<Age class="item" ref="ageRef"></Age>
				</div>
				<div class="center">
					<Map class="map" ref="mapRef"></Map>
					<Line class="line" ref="lineRef"></Line>
				</div>
				<div class="right">
					<Rank class="item" ref="rankRef"></Rank>
					<Year class="item" ref="yearRef"></Year>
					<Counter class="item" ref="counterRef"></Counter>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Top from "./components/top/Top.vue"
import Tourist from "./components/tourist/Tourist.vue"
import Sex from "./components/sex/Sex.vue"
import Age from "./components/age/Age.vue"
import Line from "./components/line/Line.vue"
import Map from "./components/map/Map.vue"
import Rank from "./components/rank/Rank.vue"
import Year from "./components/year/Year.vue"
import Counter from "./components/counter/Counter.vue"
import { randomNum } from "@/utils/global"

const screenRef = ref<HTMLElement>()
const touristRef = ref<InstanceType<typeof Tourist>>()
const sexRef = ref<InstanceType<typeof Sex>>()
const ageRef = ref<InstanceType<typeof Age>>()
const mapRef = ref<InstanceType<typeof Map>>()
const lineRef = ref<InstanceType<typeof Line>>()
const rankRef = ref<InstanceType<typeof Rank>>()
const yearRef = ref<InstanceType<typeof Year>>()
const counterRef = ref<InstanceType<typeof Counter>>()

onMounted(() => {
	if (screenRef.value) {
		screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
	}
	window.addEventListener("resize", resize)

	initCharts()
})

const initCharts = () => {
	let touristData = 0.5
	let ageData = [
		{
			value: 200,
			name: "10岁以下",
			percentage: "16%"
		},
		{
			value: 110,
			name: "10 - 18岁",
			percentage: "8%"
		},
		{
			value: 150,
			name: "18 - 30岁",
			percentage: "12%"
		},
		{
			value: 310,
			name: "30 - 40岁",
			percentage: "24%"
		},
		{
			value: 250,
			name: "40 - 60岁",
			percentage: "20%"
		},
		{
			value: 260,
			name: "60岁以上",
			percentage: "20%"
		}
	]
	let mapData = [
		{
			fromName: "北京",
			toName: "上海",
			coords: [
				[116.4551, 40.2539],
				[121.4648, 31.2891]
			]
		},
		{
			fromName: "上海",
			toName: "北京",
			coords: [
				[121.4648, 31.2891],
				[116.4551, 40.2539]
			]
		},
		{
			fromName: "北京",
			toName: "广州",
			coords: [
				[116.4551, 40.2539],
				[113.5107, 23.2196]
			]
		}
	]
	let sexData = {
		man: 0.6,
		woman: 0.4
	}
	let lineData = {
		unit: ["访问量"],
		data: new Array(30).fill("").map(val => {
			val = randomNum(1, 20000)
			return val
		})
	}
	let hotData = [
		{
			value: 79999,
			name: "峨眉山",
			percentage: "80%",
			maxValue: 100000
		},
		{
			value: 59999,
			name: "稻城亚丁",
			percentage: "60%",
			maxValue: 100000
		},
		{
			value: 49999,
			name: "九寨沟",
			percentage: "50%",
			maxValue: 100000
		},
		{
			value: 39999,
			name: "万里长城",
			percentage: "40%",
			maxValue: 100000
		},
		{
			value: 29999,
			name: "北京故宫",
			percentage: "30%",
			maxValue: 100000
		}
	]
	let rankData = {
		data: hotData,
		colors: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"]
	}
	let annualData = [
		{
			label: new Date().getFullYear() - 2 + "年",
			value: ["184", "90", "120", "0", "30", "100", "80", "40", "20", "510", "350", "180"]
		},
		{
			label: new Date().getFullYear() - 1 + "年",
			value: ["118", "509", "366", "162", "380", "123", "321", "158", "352", "474", "154", "22"]
		},
		{
			label: new Date().getFullYear() + "年",
			value: ["548", "259", "113", "90", "69", "512", "23", "49", "28", "420", "313", "156"]
		}
	]
	let yearData = {
		data: annualData,
		unit: annualData.map(val => val.label),
		columns: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		colors: ["#FFA600", "#007AFE", "#FF4B7A"]
	}
	let platFromData = [
		{
			value: 40,
			name: "智慧文旅平台",
			percentage: "40%"
		},
		{
			value: 10,
			name: "携程",
			percentage: "10%"
		},
		{
			value: 20,
			name: "飞猪",
			percentage: "20%"
		},
		{
			value: 30,
			name: "其他渠道",
			percentage: "30%"
		}
	]
	let counterData = {
		data: platFromData,
		colors: ["#078dbc", "#6ad40b", "#6172fc", "#1786ff", "#ffbe2f", "#4dc89d", "#b797df", "#ffd3aa"]
	}
	touristRef.value?.initChart(touristData)
	sexRef.value?.initChart(sexData)
	ageRef.value?.initChart(ageData)
	mapRef.value?.initChart(mapData)
	lineRef.value?.initChart(lineData)
	rankRef.value?.initChart(rankData)
	yearRef.value?.initChart(yearData)
	counterRef.value?.initChart(counterData)
}

// 定义大屏缩放比例
const getScale = (w = 1920, h = 1080) => {
	const ww = window.innerWidth / w
	const wh = window.innerHeight / h
	return ww < wh ? ww : wh
}

// 监听浏览器 resize 事件
const resize = () => {
	if (screenRef.value) {
		screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
	}
}

onBeforeUnmount(() => {
	window.removeEventListener("resize", resize)
})
</script>

<style lang="scss" scoped>
.main {
	width: 100vw;
	height: 100vh;
	background: url(../../assets/images/screen/bg.png) no-repeat;
	background-size: cover;

	.screen {
		display: flex;
		flex-direction: column;
		position: fixed;
		left: 50%;
		top: 50%;
		width: 1920px;
		height: 1080px;
		transform-origin: left top;

		.bottom {
			display: flex;
			flex: 1;
			padding: 12px 42px 20px;

			.right {
				width: 394px;
				display: flex;
				flex-direction: column;

				.item {
					flex: 1;
				}
			}

			.left {
				width: 394px;
				display: flex;
				flex-direction: column;

				.item {
					flex: 1;
				}
			}

			.center {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 20px;

				.map {
					flex: 3;
				}

				.line {
					flex: 1;
				}
			}
		}
	}
}
</style>
